import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
`;

const BasicImg= styled.Image`
  background-color: ${ ({theme}) => theme.imgBgColor};
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;


const Image = ({url})=> {
  return (
    <Container>
      <BasicImg source={{uri: url}}/>
    </Container>
  );
};


Image.propTypes={
  url: PropTypes.string,
}

export default Image;