// '설명서 보기' 버튼 만들기

import React, {useContext, useState, useRef, useEffect} from 'react';
import styled, { ThemeContext } from 'styled-components';
import {Button, ErrorMsg, Input, Image} from '../components';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../util';


//logo img url
const LOGO='https://firebasestorage.googleapis.com/v0/b/rn-chat-app-89bdb.appspot.com/o/ios-icon.png?alt=media';

const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: center;
  background-color: ${ ({theme}) => theme.bgColor};
  padding: 0 30px;
  padding-top: ${({ insets: {top} })=> top}px;
  padding-bottom: ${({ insets: {bottom }})=> bottom}px;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;

const Login = ({navigation})=> {
  const insets = useSafeAreaInsets();
  const theme=useContext(ThemeContext);
  const refPw=useRef(null);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true);


  //로그인 버튼 활성화 설정
  useEffect(() => {
    setDisabled(!(email && pw && !errorMsg));
  }, [email, pw, errorMsg]);


  //이메일 입력 
  const _handleEmailChange = email => {
    //공백 제거
    const changedEmail=removeWhitespace(email);
    //업데이트
    setEmail(changedEmail);
    //유효성 검사 후 에러 메시지 변경
    setErrorMsg(validateEmail(changedEmail) ? '' : '올바른 이메일을 입력해주세요');
  }

  //패스워드 입력
  const _handlePwChange = pw => {
    //공백 제거 후 업데이트
    setPw(removeWhitespace(pw));
    setErrorMsg(pw ? '' : '비밀번호를 입력해주세요');
  }


  //로그인 버튼 함수
  const _handleSigninBtnPress = async () => {
    try{
      // spinner.start();

      // const user= await signin({email, pw});
      // setUser(user);
      navigation.navigate('Home');
    }
    catch(e) {
      Alert.alert('Login Error',e.message);
    }
    finally{
      // spinner.stop();
    }
  }

  return (
    <KeyboardAwareScrollView 
    extraScrollHeight={20}
    contentContainerStyle={{flex: 1}}> 
    <Container insets={insets}>

      {/* 로고 이미지 */}
      <Image url={LOGO}/>

      {/* 이메일 Input */}
      <Input
      // label='이메일을 입력해주세요'
      placeholder='이메일'
      returnKeyType='next'
      value={email}
      onChangeText={_handleEmailChange} 
      onSubmitEditing={()=> refPw.current.focus()}
      />

      {/* 패스워드 Input */}
      <Input
      ref={refPw}
      // label='비밀번호를 입력해주세요'
      placeholder='비밀번호'
      returnKeyType='done'
      value={pw}
      onChangeText={_handlePwChange}
      isPassword={true}
      onSubmitEditing={_handleSigninBtnPress}
      />

      {/* 에러 메시지 */}
      <ErrorMsg msg={errorMsg}/>

      {/* 로그인 버튼 */}
      <Button 
      title="로그인" 
      onPress={_handleSigninBtnPress}
      disabled={disabled}
      containerStyle={{
        padding: 15,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 22,
        fontWeight: '600',
      }}
      />

      {/* 회원가입 버튼 */}
      <Button 
      title="이메일로 회원가입하기" 
      onPress={()=> navigation.navigate('Signup')}
      containerStyle={{
        marginTop: 5,
        marginBottom: 50,
        backgroundColor: 'transparent', 
        
      }}
      textStyle={{
        color: theme.btnTextLink,
        fontSize: 19,
        fontWeight: '600',
        // textDecorationLine:'underline',
      }}
      />
      {/* 비밀번호 찾기 버튼 */}
      <Button 
      title="비밀번호를 잊으셨나요?" 
      onPress={()=> navigation.navigate('FindPw')}
      containerStyle={{
        marginTop: 20,
        backgroundColor: 'transparent', 
      }}
      textStyle={{
        color: theme.btnDisabled,
        fontSize: 17,
        fontWeight: '500',
        textDecorationLine:'underline',
      }}
      />
    </Container>
    </KeyboardAwareScrollView>
  );
} 

export default Login;