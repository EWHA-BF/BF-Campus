import React, {useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 50px;
`;




const Post = ({navigation, route})=> {
  const theme=useContext(ThemeContext);

  // //수정 버튼 함수
  // const _handleEditBtnPress = () => {
  //   try{

  //     // 화면 이동
  //     // navigation.replace('PostCreation', {boardId,postId, title, desc});
      
  //   }
  //   // 로그인 실패
  //   catch(err){
  //     console.log(err.message);
  //     Alert.alert("실패"); 
  //   }
  //   finally{
  //   }
  // }


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
      // 수정 버튼 -해당 uid의 user만 보이게
      headerRight: ()=> {
        return (
          // 수정 함수 호출
          <TouchableOpacity 
          onPress={()=> {}}
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
          >수정</Text>
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
        {/* 삭제 버튼 */} 
          <TouchableOpacity 
          onPress={()=> {}}
          style={{
            width: 60,
            height: 35,
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: 5,
          }}
          >
          <Text
          style={{
            marginRight: 7, 
            fontSize: 18, 
            color: theme.mainRed, 
            textAlign:'right', 
            fontWeight: 'bold'
          }}
          >삭제</Text>
          </TouchableOpacity>
      </Footer>
    </Container>
    </KeyboardAwareScrollView>
  );
} 

export default Post;