import React, {useState, useEffect, useContext} from 'react';
import styled, { ThemeContext } from 'styled-components';
import {Button, Input} from '../components';
import { Alert } from 'react-native';

const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
  margin-top: 40px;
`;

const StyledText = styled.Text`
  text-align: left;
  font-size: 18px;
  color: ${ ({theme}) => theme.text};
  margin: 10px 0;
`;

const FindPw = ({navigation})=> {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  //버튼 활성화
  useEffect(() => {
    setDisabled(!(email));
  }, [email]);

  
  const theme=useContext(ThemeContext);

  return (
    <Container>
      <StyledText>비밀번호를 재설정할 이메일을 입력해주세요</StyledText>
      <Input
      //label='비밀번호를 재설정할 이메일을 입력해주세요'
      placeholder='이메일'
      returnKeyType='done'
      value={email}
      onChangeText={(email)=> {setEmail(email)}} 
      onSubmitEditing={()=>{}}
      />
      <Button 
      title="인증 메일 전송" 
      onPress={()=>{
        Alert.alert(
          "인증 메일 전송 완료!",
          "메일함을 확인하여 비밀번호를 재설정하세요",
          [
            {
              text: "취소",
              onPress: () => {},
              style: "cancel"
            },
            { text: "확인", onPress: () => navigation.navigate('Login') }
          ],
        );
      }}
      disabled={disabled}
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
      <Button 
      title="인증 메일이 오지 않나요?" 
      onPress={()=> {}}
      containerStyle={{
        marginTop: 10,
        backgroundColor: 'transparent', 
      }}
      textStyle={{
        color: theme.btnDisabled,
        fontSize: 15,
        fontWeight: '500',
        textDecorationLine:'underline',
      }}
      />
    </Container>
  );
} 

export default FindPw;