import React, {useContext} from 'react';
import styled, { ThemeContext } from 'styled-components';
import {Button} from '../components';



const Container = styled.View`
  flex : 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;

const Login = ({navigation})=> {
  // const theme=useContext(ThemeContext);

  return (
    <Container>
      <StyledText>Login</StyledText>

      {/* 회원가입 이동 버튼 */}
      <Button 
      title="sign up" 
      onPress={()=> navigation.navigate('Signup')}
      /*
      containerStyle={{
        marginTop: 0,
        backgroundColor: 'transparent', 
      }}
      textStyle={{
        color: theme.btnTextLink,
        fontSize: 18,
      }}
      */
      />
    </Container>
  );
} 

export default Login;