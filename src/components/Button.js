import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  background-color: ${ ({theme}) => theme.btnBgColor};
  padding: 10px;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100px;
  border-radius: 4px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.btnTitle};
`;

const Button = ({title, onPress})=> {
  return (
    <TouchableOpacity 
    onPress={onPress}>
      <Container>
        <Title>
          {title}
        </Title>
      </Container>
    </TouchableOpacity>
   
  )
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;