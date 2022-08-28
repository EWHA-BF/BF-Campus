import React from 'react';
import styled from 'styled-components';
import {Button} from '../components';

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

const Verify = ({navigation})=> {
  return (
    <Container>
      <BigText>인증되지 않은 사용자입니다</BigText>
      <BigText
      style={{marginBottom:40}}>아래 절차를 따라 인증해주세요!</BigText>
      <SmallText>1. 아래 버튼을 눌러 이화인 이메일로 인증 메일 전송</SmallText>
      <Button 
      title="인증 메일 전송" 
      onPress={()=>{}}
      containerStyle={{
        padding: 15,
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
      onPress={()=>navigation.navigate('Home')}
      containerStyle={{
        padding: 15,
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