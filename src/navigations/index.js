import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';

// import SideMenu from './SideMenu';

const Navigation = () => {
  return (
    //Navigation Container
    <NavigationContainer>

      {/* 로그인 여부에 따라 다른 화면 렌더링 */}
      {/* {user.uid ? <Main/> : <Auth />} */}


      <Main />


      {/* 진행중 여부에 따라 spinner 렌더링 추가 */}
    </NavigationContainer>
  );
}

export default Navigation;
