import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  
`;

const WalkthroughImg= styled.Image`
  background-color: ${ ({theme}) => theme.imgBgColor};
  width: 100px;
  height: 100px;
`;


const Image = ({url})=> {
  return (
    <Container>
      <WalkthroughImg source={{uri: url}}/>
    </Container>
  );
};


Image.propTypes={
  url: PropTypes.string,
}

export default Image;