import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {MainBoard, Home} from '../screens'; 
import styled, { ThemeContext } from 'styled-components';

const Drawer = createDrawerNavigator();


export default function DrawerNav() {
  const theme=useContext(ThemeContext);
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    backBehavior='order'
    
    screenOptions={{
      //배경색 지정
      cardStyle: {
        backgroundColor: theme.bgColor
      },
      
      //header 설정
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 20,
        color: theme.text,
      },
      headerTintColor: theme.ewha_green,
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,

      //메뉴 설정
      drawerActiveTintColor: theme.activeMenuText,
      drawerActiveBackgroundColor :theme.activeMenuBg,  
      drawerInactiveTintColor: theme.menuText,
    }}>
      <Drawer.Screen 
      name='Home' 
      component={Home} 
      options={{
        drawerLabel: '홈',
        title: '앱 이름',
      }}/>
      <Drawer.Screen 
      name='MainBoard' 
      component={MainBoard} 
      options={{
        drawerLabel: '게시판',
        title: '게시판'
      }}/>
    </Drawer.Navigator>
  );
}