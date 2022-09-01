import React from 'react';
import styled from 'styled-components';
import {Button, Image} from '../components';
import {TouchableOpacity, View} from 'react-native';

const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: space-evenly;
`;

//row container
const Row=styled.View`
  flex-direction: row;
  width: 80%;
  height: 30%;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;

const Home = ({navigation})=> {
  return (
    <Container>
     
     {/* Map */}
     <TouchableOpacity
     onPress={()=>navigation.navigate('Map')}
     activeOpacity={0.8}>
      {/* 이미지 url 수정 */}
      <Image 
      url='https://firebasestorage.googleapis.com/v0/b/rn-chat-app-89bdb.appspot.com/o/ios-icon.png?alt=media' 
      containerStyle={{
        // 화면 크기에 따라 바뀌도록 사이즈 조절 (windowdimension 이용)
        width: 300,
        height: 200,
        resizeMode: 'stretch',
      }}/>
    </TouchableOpacity>


    {/*긴급 게시판*/}  
    <View
    backgroundColor='black'
    style={{
      width: 300,
      height: 150,
    }}
    ><StyledText style={{color: 'white'}}>게시판</StyledText>
    </View>

    {/*나의 게시판*/}
    {/* row container*/}
    <View
    backgroundColor='black'
    style={{
      width: 300,
      height: 150,
    }}
    ><StyledText style={{color: 'white'}}>나의 게시판</StyledText>
    </View>
    </Container>
  );
} 

export default Home;