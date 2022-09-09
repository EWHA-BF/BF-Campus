import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import Navigation from './navigations';
import { UserProvider, ProgressProvider } from './contexts';

const App = () => {
  // 오류 해결 시도
  // const [state, setState] = useState(1);
  // useEffect(() => {
  //   const t = setInterval(
  //     () => setState(valueGoesHere),
  //     200,
  //   );
  //   return () => clearInterval(t);
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* ProgressProvider */}
      <ProgressProvider>
      {/* UserProvider */}
      <UserProvider>
        {/* 상태바 */}
        <StatusBar 
        backgroundColor={theme.bgColor}
        barStyle="dark-content"/>
        {/* 내비게이션 */}
        <Navigation /> 
      </UserProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;

