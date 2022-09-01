import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';

// import {Home} from '../screens'; 
import DrawerNav from './DrawerNav'; 
import {Map} from '../screens';

const Stack = createStackNavigator();

//로그인 Yes 화면
const Main = ()=> {
  const theme=useContext(ThemeContext);
  return (
  <Stack.Navigator screenOptions={{
    cardStyle: {backgroundColor: theme.bgColor},
    headerShown: false,
  }}>
    <Stack.Screen 
    name='Main' 
    component={DrawerNav}
    />
    <Stack.Screen 
    name='Map' 
    component={Map}
    />
  </Stack.Navigator>
  );
} 

export default Main;