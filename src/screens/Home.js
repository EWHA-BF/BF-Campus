import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {Image} from '../components';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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

const compoWidth=Dimensions.get('window').width-20*3;

const StyledCompo=styled.View`
  background-color: ${ ({theme}) => theme.bgColor};
  border: 2px solid ${ ({theme}) => theme.errorText};
  border-radius: 15px;
  width: ${compoWidth}px;
  height: 120px;
`;

const CompoHeader = styled.View`
  flex: 1.5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${ ({theme}) => theme.errorText};
  flex-direction: row;
  align-items: center;
`;


const Home = ({navigation})=> {
  const theme=useContext(ThemeContext);

  return (
    <Container>

     {/* 지도 */}
     <TouchableOpacity
     onPress={()=>navigation.navigate('Map')}
     activeOpacity={0.8}>
      {/* 이미지 url 수정 */}
      <Image 
      url='https://firebasestorage.googleapis.com/v0/b/rn-chat-app-89bdb.appspot.com/o/ios-icon.png?alt=media' 
      containerStyle={{
        width: (Dimensions.get('window').width) - 20*3,
        height: 220,
        resizeMode: 'stretch',
        borderRadius: 15,
      }}/>
    </TouchableOpacity>

    {/*긴급 게시판*/}  
    <TouchableOpacity
     onPress={()=> navigation.navigate('EmergencyBoard') }
     activeOpacity={0.8}>
      <StyledCompo>
        <CompoHeader>
        <Ionicons 
          name="notifications" 
          size={22}
          style={{flex: 1, marginLeft: 15,}}
          color='white'/> 
        <StyledText style={{color: 'white', flex: 6, fontSize: 18, fontWeight: 'bold'}}>긴급 게시판</StyledText>
        <Ionicons 
          name="ios-chevron-forward-outline" 
          size={25}
          style={{flex: 1}}
          color='white'/> 
        </CompoHeader>
          <StyledText style={{flex: 2, textAlign: 'center', paddingTop: 20, fontSize: 16, color: 'grey'}}>캠퍼스 내 긴급한 소식을 빠르게 알려 드립니다!</StyledText>
      </StyledCompo>
     </TouchableOpacity>
      

    {/* 나의 게시판
    <BoardGrid/>  */}


    {/*게시판 목록*/}  
    <TouchableOpacity
     onPress={()=>navigation.navigate('BoardsList')}
     activeOpacity={0.8}>
      <StyledCompo style={{borderColor: theme.ewha_green}}>
        <CompoHeader style={{backgroundColor: theme.ewha_green}}>
        <Ionicons 
          name="menu" 
          size={22}
          style={{flex: 1, marginLeft: 15,}}
          color='white'/> 
        <StyledText style={{color: 'white', flex: 6, fontSize: 18, fontWeight: 'bold'}}>게시판 목록</StyledText>
        <Ionicons 
          name="ios-chevron-forward-outline" 
          size={25}
          style={{flex: 1}}
          color='white'/> 
        </CompoHeader>
          <StyledText style={{flex: 2, textAlign: 'center', paddingTop: 20, fontSize: 16, color: 'grey'}}>게시판에서 원하는 건물의 정보만 찾아 보세요!</StyledText>
      </StyledCompo>
     </TouchableOpacity>
    
    </Container>
  );
} 

export default Home;