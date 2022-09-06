import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;

const EmergencyBoard = ({navigation})=> {
  return (
    <Container>
      <StyledText>EmergencyBoard</StyledText>
    </Container>
  );
} 

export default EmergencyBoard;