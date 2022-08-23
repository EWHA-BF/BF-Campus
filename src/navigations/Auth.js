import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import {Signup, Login, Home, Walkthrough, Verify, FindPw} from '../screens'; 

const Stack = createStackNavigator();

//로그인 No 화면
const Auth = ()=> {
  const theme=useContext(ThemeContext);
  return (
  <Stack.Navigator 
  initialRouteName='Walkthrough'
  screenOptions={{
    cardStyle: {backgroundColor: theme.bgColor}
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
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      // theme 사용
      headerTintColor: theme.text,
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
    }}/>
    <Stack.Screen 
    name="Verify" 
    component={Verify}/>
    <Stack.Screen 
    name="FindPw" 
    component={FindPw}/>
    <Stack.Screen 
    name="Home" 
    component={Home}
    />
  </Stack.Navigator>
  );
} 

export default Auth;