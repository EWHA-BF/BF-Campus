// 알림 아이콘 작동 수정하기


import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DB} from '../firebase';
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";


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
// noti 
const Item= React.memo(
  ({item: {id, title}, onPress}) => {
  // const [isNoti, setIsNoti] =useState({noti});
  const theme=useContext(ThemeContext);

  return (
    <ItemContainer
    onPress={()=> onPress({id, title})}
    >
        {/* { (isNoti)?  */}
          <Ionicons 
          name="notifications" 
          size={23}
          style={{
            marginHorizontal: 15
          }}
          color={theme.bgColor}
          onPress={ () => {}
              // (isNoti)=> setIsNoti(!isNoti)
          }/>
          {/* // :
          // <Ionicons 
          // name="notifications-off-outline" 
          // size={23}
          // style={{
          //   marginHorizontal: 15
          // }}
          // color={theme.bgColor}
          // onPress={
          //     (isNoti)=> setIsNoti(!isNoti)
          // }/> } */}
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


const BoardsList = ({navigation})=> {
  const theme=useContext(ThemeContext);


  //게시판 목록 배열 상태변수
  const [boards, setBoards] =useState([]);


  // 마운트 될 때 동작
  // board collection 모든 문서 불러오기 (실시간 업데이트 수신)
  useEffect(()=>{
    const q = query(collection(DB, "boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
          // console.log(doc.id); //document id
          list.push(doc.data());
          // data에 id 포함됨!
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

export default BoardsList;