import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';

// import {Home} from '../screens'; 
import DrawerNav from './DrawerNav'; 
import {Map, BoardList, EmergencyBoard} from '../screens';


const Stack = createStackNavigator();

//로그인 Yes 화면
const Main = ()=> {
  const theme=useContext(ThemeContext);
  return (
  <Stack.Navigator
  initialRouteName= 'Main'
  screenOptions={{
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
    <Stack.Screen 
    name='EmergencyBoard' 
    component={EmergencyBoard}
    />  
    <Stack.Screen 
    name='BoardList' 
    component={BoardList}
    />  
  </Stack.Navigator>
  );
} 

export default Main;