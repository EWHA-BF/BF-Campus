import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Login, Home} from '../screens'; 
import styled, { ThemeContext } from 'styled-components';


const Drawer = createDrawerNavigator();


export default function DrawerNav() {
  const theme=useContext(ThemeContext);
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    backBehavior='order'
    screenOptions={{
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
      name='Login' 
      component={Login} 
      options={{
        drawerLabel: '로그인'
      }}/>
    </Drawer.Navigator>
  );
}