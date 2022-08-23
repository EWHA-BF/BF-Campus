import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 24px;
  margin: 15px 0;
  line-height: 24px;
  font-size: 16px;
  color: ${ ({theme}) => theme.errorText};

`;

const ErrorMsg = ({msg}) => {
  return (
    <StyledText>{msg}</StyledText>
  )
}

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
}

export default ErrorMsg;