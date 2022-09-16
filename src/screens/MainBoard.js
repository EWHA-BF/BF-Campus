import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button, TimeStamp } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collectionGroup, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import {DB} from '../firebase';

const Container = styled.View`
  flex : 1;
  background-color: ${ ({theme}) => theme.bgColor};
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${ ({theme}) => theme.text};
`;


//=-=- post item -=-=
// 컨테이너
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${ ({theme}) => theme.light_grey};
  padding: 20px 25px;
  padding-right: 15px;
`;
// 제목과 내용을 감싸는 컨테이너
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
// 제목
const ItemTitle =styled.Text`
  font-size: 18px;
  font-weight: 600;
`;
// 시간
const ItemTime = styled.Text`
  font-size: 14px;
  color: 'black';
  margin-right: 10px;
`;
// 아이콘
const ItemIcon = styled(Ionicons).attrs(({theme}) => ({
  name: 'chevron-forward-sharp',
  size: 22,
  color: theme.light_grey,
}))``;


//item 컴포넌트
const Item= React.memo(
  
  ({item: {title, description, userName, createdAt, uid, image, isEmer, id}, onPress}) => {
  return (
    <ItemContainer onPress={()=> onPress({title, description, userName, createdAt, uid, image, isEmer, id})}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
      </ItemTextContainer>
      <ItemTime>{TimeStamp(createdAt)}</ItemTime>
      <ItemIcon />
    </ItemContainer>
  )
});
// =-=- -=-=-



const MainBoard = ({navigation, route})=> {
  const theme=useContext(ThemeContext);

  //항목 목록 배열 상태 변수
  const [posts, setPosts] = useState([]);
  
  // 마운트될 때 동작
  // 모든 post collection에서 모든 문서 읽어오기 - 날짜 내림차순
  useEffect(()=> {
    const q = query(collectionGroup(DB, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setPosts(list);
    });
    return ()=> unsubscribe();
  }, []);

  
  return (
    <Container>
      <FlatList 
      data={posts}
      renderItem={({item})=> 
      <Item 
      item={item} 
      onPress={params=>{
        navigation.navigate('Post', params);
      }}
      />}
      keyExtractor={item=>item['id']}
      windowSize={5}
      />
    </Container>
  );
} 

export default MainBoard;