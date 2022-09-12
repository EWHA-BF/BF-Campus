import React, {useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert, Dimensions, Text, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { TimeStamp } from '../components';
import {getCurUser, DB} from '../firebase';
import { doc, deleteDoc, collectionGroup, query, where, getDocs } from "firebase/firestore";




const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: flex-start; 
  padding: 10px 20px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  background-color: ${ ({theme}) => theme.bgColor};
  color: ${ ({theme}) => theme.dark_grey};
  /* font-weight: bold; */
  /* padding: 20px; */
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

const HeaderText=styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  padding: 0 10px;
`;


const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;



// navigation, 
const Post = ({navigation,route})=> {
  const theme=useContext(ThemeContext);

  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle : route.params.title,
      // 뒤로 가기
      headerLeft: ({onPress}) => {
        return (
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={onPress}
          color={theme.ewha_green}/> 
        );
      },
      headerRight: ()=> {
        // 수정 버튼 -해당 uid의 user만 보이게
        // return (
        //   <TouchableOpacity 
        //   onPress={()=> {}}
        //   style={{
        //     borderRadius: 20,
        //     paddingHorizontal: 12,
        //     paddingVertical: 8,
        //     backgroundColor: theme.bgColor,
        //     marginRight: 10,
        //   }}
        //   >
        //   <Text
        //   style={{
        //     fontSize: 17,
        //     color: theme.ewha_green,
        //   }}
        //   >수정</Text>
        //   </TouchableOpacity>
        // );
      }
    })
  })

  const curUser=getCurUser();

  // 삭제 버튼 함수
  const _handleDeleteBtnPress = async () => {
    // Alert.alert(
    //     "글을 삭제하시겠습니까?",
    //     [
    //       {
    //         text: "아니오",
    //         onPress: () => {},
    //         style: "cancel"
    //       },
    //       { text: "예", onPress: () => 
    //       // collection group 접근
            // await deleteDoc(doc(DB, "posts", `${route.params.id}`))

            // 컬렉션 그룹 쿼리-오류
            // const nowPost = query(collectionGroup(DB, 'posts'), where('id', '==', `${route.params.id}`));
            // const querySnapshot = await getDocs(nowPost);
            // querySnapshot.forEach((doc) => {
            //   console.log(doc);
            //   deleteDoc(doc);
            // });
      //     }
      //   ],
      // );  
  }

  return (
    
    <ScrollView>
    {/* <KeyboardAwareScrollView 
    contentContainerStyle={{flex: 1}}
    extraScrollHeight={20}> */}
    <Container>

      <HeaderText>
        <StyledText>작성자: {route.params.userName}</StyledText>
        <StyledText style={{
          fontWeight: 'normal',
          fontSize: 15,
        }}>
          {TimeStamp(route.params.createdAt)}
          </StyledText>
      </HeaderText>
      
      {/* 제목 */}
      <StyledInput 
      label='title' 
      value={route.params.title}
      editable={false}
      />

      {/* 내용 */}
      <StyledInput 
      label='desc' 
      value={route.params.description} 
      multiline={true}
      style={{
        height: 300,
        maxHeight: 300,
        textAlignVertical: 'top',
      }}
      editable={false}
      />


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
            value={route.params.isEmer}
            disabled={true}
          />
          <Text style={{
            marginLeft: 12, 
            fontSize: 18, 
            color: theme.mainRed, 
            textAlign:'center', 
            fontWeight: 'bold'}}>긴급</Text>
        </View>
      </Footer>

      
      <StyledImg source={{ uri: route.params.image }} /> 


      { 
      ((route.params.uid) == (curUser.uid)) &&
        <TouchableOpacity
        // 삭제 버튼
        onPress={_handleDeleteBtnPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.bgColor,
          width: 100,
          padding: 10,
          marginTop: 0,
          position: 'absolute',
          bottom: 40,
          left: (Dimensions.get('window').width / 2)-(100/2),
        }}
        >
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.mainRed,
        }}>글 삭제</Text>
        </TouchableOpacity>
      }
      
    </Container>
    </ScrollView>
  );
} 

export default Post;