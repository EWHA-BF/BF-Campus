import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import Navigation from './navigations';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* 상태바 */}
      <StatusBar 
      backgroundColor={theme.bgColor}
      barStyle="dark-content"/>
      {/* 내비게이션 */}
      <Navigation />
    </ThemeProvider>
  );
}

export default App;

