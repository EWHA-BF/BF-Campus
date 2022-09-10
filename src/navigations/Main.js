import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';


// import {Home} from '../screens'; 
import DrawerNav from './DrawerNav'; 
import {Map, BoardsList, EmergencyBoard, EngBoard, PostCreation} from '../screens';
import Navigation from '.';


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
    name='BoardsList' 
    component={BoardsList}
    />  
    <Stack.Screen
    name='EngBoard'
    component={EngBoard}
    options={{
      headerTitle : '공학관',
      headerShown: true,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerTintColor: theme.ewha_green,
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }}
    />
    <Stack.Screen
    name='PostCreation'
    component={PostCreation}
    options={{
      headerTitle : '글 쓰기',
      headerShown: true,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerTintColor: theme.ewha_green,
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }}
    />
  </Stack.Navigator>
  );
} 

export default Main;