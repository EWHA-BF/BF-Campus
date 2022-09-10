import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button, ErrorMsg } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';
import {createPost} from '../firebase';


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


const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 50px;
`;




const PostCreation = ({navigation})=> {
  const theme=useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [errMsg, setErrMsg] =useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmer, setIsEmer] = useState(false);

  const refDesc = useRef(null);

  const {spinner} = useContext(ProgressContext);

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


  //완료 버튼 클릭 함수
  const _handlePostBtnPress = async () => {
    try{

      //spinner 실행
      spinner.start();

      //post 생성하고 id 받기
      const id = await createPost({title: title.trim(), desc: desc.trim()})
      
      // navigation.goBack();
      // 화면 이동하면서 id랑 제목 전달
      navigation.replace('EngBoard', {id, title})
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
    setDisabled(!(title && desc&& !errMsg));
  }, [title, desc, errMsg])


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
      headerRight: ({onPress})=> {
        return (
          // 글쓰기 완료 함수 호출
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
  })

  return (
    <KeyboardAwareScrollView 
    contentContainerStyle={{flex: 1}}
    extraScrollHeight={20}>
    <Container>
      {/* 에러 메시지 */}
      <ErrorMsg msg={errMsg}/>

      {/* 안내 문구 */}
      <StyledText>
        가이드라인
        가이드라인
        가이드라인
        가이드라인
        가이드라인
        가이드라인
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
        height: 300,
        maxHeight: 300,
      }}/>

      <Footer>
        {/* 사진 첨부 버튼 */}
        <Ionicons 
          name="camera" 
          size={30}
          onPress={()=> {}}
          />

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

      
    </Container>
    </KeyboardAwareScrollView>
  );
} 

export default PostCreation;