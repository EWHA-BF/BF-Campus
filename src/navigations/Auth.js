import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import {Signup, Login, Home, Walkthrough, Verify, FindPw} from '../screens'; 
import DrawerNav from './DrawerNav'; 

const Stack = createStackNavigator();

//로그인 No 화면
const Auth = ()=> {
  const theme=useContext(ThemeContext);
  return (
  <Stack.Navigator 
  initialRouteName='Walkthrough'
  screenOptions={{
    //배경색 지정
    cardStyle: {
      backgroundColor: theme.bgColor
    },
    //header 설정
    headerStyle: {
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    headerTintColor: theme.text,
    headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerLeft: ({onPress, tintColor}) => {
        return (
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          color={tintColor}
          onPress={onPress}/> 
        );
      }
  }}>
    <Stack.Screen 
    name="Walkthrough" 
    component={Walkthrough}
    options={{
      headerShown: false,
    }}
    />
    <Stack.Screen 
    name="Login" 
    component={Login}
    options={{
      headerShown: false,
    }}
    />
    <Stack.Screen 
    name="Signup" 
    component={Signup}
    options={{
      headerTitle: '회원가입',
    }}/>
    <Stack.Screen 
    name="Verify" 
    component={Verify}
    options={{
      headerTitle: '이메일 인증',
    }}/>
    <Stack.Screen 
    name="FindPw" 
    component={FindPw}
    options={{
      headerTitle: '비밀번호 재설정',
    }}/>
    <Stack.Screen 
    name="Home" 
    component={DrawerNav}
    options={{
      headerShown: false,
    }}
    />
    {/* <Stack.Screen 
    name="EditBoardGrid" 
    component={EditBoardGrid}
    options={{
      headerShown: false,
    }}
    /> */}
  </Stack.Navigator>
  );
} 

export default Auth;