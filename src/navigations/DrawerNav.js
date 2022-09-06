import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {MainBoard, Home, Map, EmergencyBoard, Profile, Settings, BoardList} from '../screens'; 
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
        color: theme.ewha_green,
      },
      headerTintColor: theme.ewha_green,
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,

      //메뉴 설정
      drawerActiveTintColor: theme.activeMenuText,
      drawerActiveBackgroundColor :theme.activeMenuBg,  
      drawerInactiveTintColor: theme.menuText,
      drawerLabelStyle: {fontSize: 20, marginLeft: 5, fontWeight: 'bold'}
    }}>
      <Drawer.Screen 
      name='Home' 
      component={Home} 
      options={{
        drawerLabel: '홈',
        title: '앱 이름',
      }}/>
      <Drawer.Screen 
      name='Map' 
      component={Map} 
      options={{
        drawerLabel: '지도',
        title: '지도',
      }}/>
      <Drawer.Screen 
      name='BoardList' 
      component={BoardList} 
      options={{
        drawerLabel: '게시판',
        title: '게시판 목록'
      }}/>
      <Drawer.Screen 
      name='MainBoard' 
      component={MainBoard} 
      options={{
        drawerLabel: '전체 게시판',
        title: '전체 게시판',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='EmergencyBoard' 
      component={EmergencyBoard} 
      options={{
        drawerLabel: '긴급 게시판',
        title: '긴급 게시판',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='Profile' 
      component={Profile} 
      options={{
        drawerLabel: '내 정보',
        title: '내 정보'
      }}/>
      <Drawer.Screen 
      name='Settings' 
      component={Settings} 
      options={{
        drawerLabel: '설정',
        title: '설정'
      }}/>
    </Drawer.Navigator>
  );
}