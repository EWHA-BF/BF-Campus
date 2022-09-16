import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button, ErrorMsg } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert, Platform, ScrollView, Dimensions} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';
import {createPost, getCurUser} from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage, DB} from "../firebase";
import { getFirestore, collection, addDoc, setDoc, doc,updateDoc  } from "firebase/firestore";


const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: flex-start; 
  padding: 10px 20px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${ ({theme}) => theme.bgColor};
  background-color: ${ ({theme}) => theme.ewha_green};
  padding: 20px;
  line-height: 30px;
`;

const StyledInput = styled.TextInput`
  background-color: ${({ theme }) => theme.inputBgColor};
  color: ${({ theme }) => theme.text};
  padding: 13px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.light_grey};
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;

const StyledImg= styled.Image`
  background-color: ${({ theme }) => theme.light_grey};
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 100px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;



const PostCreation = ({route})=> {
  const theme=useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [errMsg, setErrMsg] =useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmer, setIsEmer] = useState(false);
  const [image, setImage] = useState(null);

  const refDesc = useRef(null);

  const {spinner} = useContext(ProgressContext);


  const navigation = useNavigation(); 


  //title 변경
  const _handleTitleChange = title => {
    setTitle(title);
    //빈 경우
    setErrMsg(title.trim() ? '' : '제목을 입력해주세요.')
  }


  //description 변경
  const _handleDescChange = desc => {
    setDesc(desc);
    //빈 경우
    setErrMsg(desc.trim() ? '' : '내용을 입력해주세요.')
  }


  //사진 버튼 클릭
  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  //완료 버튼 클릭 함수
  const _handlePostBtnPress = async () => {
    try{

      //spinner 실행
      spinner.start();

      //user 받기
      const curUser=getCurUser();

      // 함수 호출하여 db에 올리고 post id 받기
      const id = await createPost({
        boardId: route.params.boardId, 
        title: title.trim(), 
        desc: desc.trim(),
        isEmer: isEmer, 
        image: image, 
        uid: curUser.uid, 
        userName: curUser.displayName,
      });

      const uri=image;
    
      // 이미지 storage 처리
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `post/${id}/photo.jpg`);

      uploadBytes(storageRef, blob).then((snapshot) => {
        
        // storage에서 img 값 불러오기
        getDownloadURL(storageRef)
        .then((url) => {
          const curDocRef = doc(DB, "boards", `${route.params.boardId}/posts/${id}`);
          updateDoc(curDocRef, {
            image: url,
          });
          navigation.replace('Post', {
            id, 
            title, 
            description: desc, 
            image, 
            userName: curUser.displayName, 
            isEmer,
            uid: curUser.uid,
          });
        })  
        .catch((error) => {
          console.log(error.message);
        });
      });
    }

    // 로그인 실패
    catch(err){
      console.log(err.message);
      Alert.alert("업로드 실패"); 
    }
    finally{
      // spinner 중지
      spinner.stop();
    }
  }


  //버튼 활성화 여부 업데이트
  useEffect(()=> {
    setDisabled(!(title && desc&& !errMsg && image));
  }, [title, desc, errMsg, image])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Photo Permission',
            'Please turn on the camera permission.'
          );
          navigation.goBack();
        }
      }
    })();
  }, []);


  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft: ({onPress}) => {
        return (
          <TouchableOpacity onPress={onPress}>
          <Text
          style={{
            fontSize: 18,
            color: theme.text,
            marginLeft: 15,
          }}
          >취소</Text>
          </TouchableOpacity>
        );
      },
      headerRight: ()=> {
        return (
          <TouchableOpacity 
          onPress={_handlePostBtnPress}
          disabled={disabled}
          style={{
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: theme.mainRed,
            marginRight: 10,
          }}
          >
          <Text
          style={{
            fontSize: 17,
            color: 'white',
          }}
          >완료</Text>
          </TouchableOpacity>
        );
      }
    })
  });

  return (
    <ScrollView>
    <KeyboardAwareScrollView 
    contentContainerStyle={{flex: 1}}
    extraScrollHeight={20}>
    <Container>
      {/* 에러 메시지 */}
      <ErrorMsg msg={errMsg}/>

      {/* 안내 문구 */}
      <StyledText>
        {
`❕이용자님의 게시글은 누군가에게 매우 중요한 정보입니다. 모두에게 공개되는 만큼 게시글을 신중하게 작성하여 주시기 바랍니다. 
❕상황에 맞는 사진을 올려 주시면 더 유용하고 자세한 정보를 제공할 수 있습니다.`}
      </StyledText>

      {/* 제목 입력 */}
      <StyledInput 
      label='title' 
      value={title}
      onChangeText={_handleTitleChange}
      onSubmitEditing={()=>refDesc.current.focus()}
      placeholder='제목 입력'
      returnKeyType='next'
      onBlur={()=> setTitle(title.trim())}
      maxLength={30}
      />

      {/* 내용 입력 */}
      <StyledInput 
      label='desc' 
      value={desc} 
      ref={refDesc}
      onChangeText={_handleDescChange}
      placeholder='내용 입력'
      returnKeyType='done'
      onBlur={()=> setDesc(desc.trim())}
      multiline={true}
      style={{
        height: 200,
        maxHeight: 200,
        textAlignVertical: 'top',
      }}/>

      <Footer>
        {/* 긴급 체크 버튼 */} 
        <View style={{ 
          width: 60,
          height: 35,
          flexDirection: 'row', 
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: 5,
          }}>
          <Checkbox
            value={isEmer}
            onValueChange={setIsEmer}
          />
          <Text style={{
            marginLeft: 12, 
            fontSize: 18, 
            color: theme.mainRed, 
            textAlign:'center', 
            fontWeight: 'bold'}}>긴급</Text>
        </View>
      </Footer>

      {/* 이미지 */}
      <StyledImg source={{ uri: image }} /> 

      <TouchableOpacity
      // 사진 수정 버튼
      onPress={_handlePhotoBtnPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.bgColor,
        borderWidth: 2,
        borderColor: theme.ewha_green,
        width: 100,
        padding: 10,
        marginTop: 0,
        borderRadius: 30,
        position: 'absolute',
        bottom: 40,
        left: (Dimensions.get('window').width / 2)-(100/2),
      }}
      >
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.ewha_green,
      }}>사진 수정</Text>
      </TouchableOpacity>

    </Container>
    </KeyboardAwareScrollView>
    </ScrollView>
  );
} 

export default PostCreation;