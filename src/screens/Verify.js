//일단 보류


import React from 'react';
import styled from 'styled-components';
import {Button} from '../components';
import {Alert} from 'react-native';

import { sendEmailVerification } from "firebase/auth";
import {auth} from '../firebase';

const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${ ({theme}) => theme.bgColor};
  padding: 30px;
`;

const BigText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.bigText};
  margin: 10px 0;
  font-weight: 600;
`;

const SmallText = styled.Text`
  width: 100%;
  font-size: 20px;
  color: ${ ({theme}) => theme.smallText};
  margin: 10px 0;
  padding: 10px;
  text-align: start;
`;

// async await 추가!!
const Verify = ({navigation})=> {
  //인증 메일 전송 
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser);
    Alert.alert('이메일을 전송하였습니다. 메일함을 확인해주세요.');
  };

  //인증 여부 확인
  const isVerify = () => {
    auth.currentUser.reload();
    if(auth.currentUser.emailVerified) {
      Alert.alert('인증 완료되었습니다');
      navigation.navigate('Home');
    }
    else{
      Alert.alert('인증을 완료해주세요.');
    }
  }




  return (
    <Container>
      <BigText>인증되지 않은 사용자입니다</BigText>
      <BigText
      style={{marginBottom:40}}>아래 절차를 따라 인증해주세요!</BigText>
      <SmallText>1. 아래 버튼을 눌러 이화인 이메일로 인증 메일 전송</SmallText>
      <Button 
      title="인증 메일 전송" 
      onPress={sendEmail}
      containerStyle={{
        padding: 12,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 18,
        fontWeight: '600',
      }}
      />
      <SmallText>2. 메일함에서 인증 메일에 첨부된 링크 클릭</SmallText>
      <SmallText>3. 아래 버튼을 눌러 인증 완료</SmallText>
      <Button 
      title="인증 완료" 
      onPress={isVerify}
      containerStyle={{
        padding: 12,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 18,
        fontWeight: '600',
      }}
      />
    </Container>
  );
} 

export default Verify;