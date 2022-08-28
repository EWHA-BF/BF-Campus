import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';

// import {Home} from '../screens'; 
import DrawerNav from './DrawerNav'; 

const Stack = createStackNavigator();

//로그인 Yes 화면
const Main = ()=> {
  const theme=useContext(ThemeContext);
  return (
  <Stack.Navigator screenOptions={{
    headerTitleAlign: 'center',
    headerTintColor: theme.text,
    headerBackTitleVisible: false,
    cardStyle: {backgroundColor: theme.bgColor}
  }}>
    <Stack.Screen 
    name='Main' 
    component={DrawerNav}
    options={{
      headerShown: false,
    }}/>
  </Stack.Navigator>
  );
} 

export default Main;