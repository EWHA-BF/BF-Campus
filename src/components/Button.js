import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

//버튼 컨테이너 기본 값
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${ ({theme}) => theme.btnBgColor};
  /* opacity: ${ ({disabled}) => disabled? 0.5 : 1};   */
  /* background-color: ${ ({theme, disabled}) => disabled? theme.btnDisabled : theme.btnBgColor}; */
`;

//버튼 타이틀 기본 값
const Title = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.btnTitle};
`;


const Button = ({title, onPress, containerStyle, textStyle, disabled})=> {
  return (
    <TouchableOpacity 
    style={{flexDirection: 'row'}}
    onPress={onPress}
    disabled={disabled}>
      <Container style={containerStyle} disabled={disabled}>
        <Title style={textStyle}>
          {title}
        </Title>
      </Container>
    </TouchableOpacity>
   
  )
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;