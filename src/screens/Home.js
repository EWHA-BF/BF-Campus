import React, {useContext} from 'react';
import styled from 'styled-components';
import {Button, Image, BoardGrid} from '../components';
import {TouchableOpacity, View, Dimensions} from 'react-native';

const Container = styled.SafeAreaView`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
  align-items: center;
  justify-content: space-evenly;
`;

//row container
const Row=styled.View`
  flex-direction: row;
  width: 95%;
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
        width: (Dimensions.get('window').width) - 20*3,
        height: 220,
        marginTop:30,
        resizeMode: 'stretch',
      }}/>
    </TouchableOpacity>


    {/* 나의 게시판
    <BoardGrid/>  */}


    {/*긴급 게시판*/}  
   
      <View
        backgroundColor='black'
        style={{
          width: (Dimensions.get('window').width) - 20*3,
          height: 100,
          marginBottom:40,
          marginTop: 20,
        }}
      >
        <StyledText style={{color: 'white'}}>긴급 게시판</StyledText>
      </View>
    
    </Container>
  );
} 

export default Home;