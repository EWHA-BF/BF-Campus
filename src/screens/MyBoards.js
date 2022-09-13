import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DB, getCurUser} from '../firebase';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";


const {width} = Dimensions.get('window');


//=-=- post item -=-=
// 컨테이너
const ItemContainer = styled.TouchableOpacity`
  width: ${width-30}px;
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${ ({theme}) => theme.ewha_green};
  border-radius: 10px;
  margin: 0 10px;
  margin-top:20px;
`;
// 제목
const ItemTitle =styled.Text`
  font-size: 18px;
  color: ${ ({theme}) => theme.bgColor};
  padding: 0 20px;
`;


//item 컴포넌트
const Item= React.memo(
  ({item: {id, title}, onPress}) => {
  const theme=useContext(ThemeContext);

  return (
    <ItemContainer
    onPress={()=> onPress({id, title})}
    >
      <ItemTitle>{title}</ItemTitle>
      <Ionicons 
        name='chevron-forward-outline'
        size={23}
        style={{
          marginHorizontal: 15
        }}
        color={theme.bgColor}
      />
    </ItemContainer>
  )
});
// =-=- -=-=-


const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;


const MyBoards = ({navigation})=> {
  const theme=useContext(ThemeContext);


  //게시판 목록 배열 상태변수
  const [boards, setBoards] =useState([]);

  const curUser=getCurUser();


  // 마운트 될 때 동작
  useEffect(()=>{
    
    const boardsRef = collection(DB, "boards");

    // board collection에서 starUsers 필드 배열에 uid 값을 포함하는 board 문서를 불러오기
    const q = query(boardsRef, where("starUsers", "array-contains", `${curUser.uid}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
          list.push(doc.data());
      });
      setBoards(list);
    });
    
    return ()=> unsubscribe();
  }, []);

  return (
    <Container>
      <FlatList 
      data={boards}
      
      renderItem={({item})=> 
        <Item 
        item={item} 
        onPress={params=>{
          navigation.navigate('EngBoard', params);
        }}
        />
      }
      keyExtractor={item=>item['id']}
      windowSize={5}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      />
    </Container>
  );
} 

export default MyBoards;