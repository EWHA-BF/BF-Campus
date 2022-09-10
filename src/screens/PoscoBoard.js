import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DB from '../firebase';




//=-=- post item -=-=
// 컨테이너
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: 'black';
  padding: 15px 20px;
`;
// 제목과 내용을 감싸는 컨테이너
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
// 제목
const ItemTitle =styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
// 내용
const ItemDesc =styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: 'grey';
`;
// 시간
const ItemTime = styled.Text`
  font-size: 12px;
  color: 'black';
`;
// 아이콘
const ItemIcon = styled(Ionicons).attrs(({theme}) => ({
  name: 'chevron-forward-sharp',
  size: 24,
  color: theme.text,
}))``;


//item 컴포넌트
const Item= React.memo(({item: {id, title, description, createdAt}, onPress}) => {
  console.log(id);

  return (
    <ItemContainer>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDesc>{description}</ItemDesc>
      </ItemTextContainer>
      <ItemTime>{createdAt}</ItemTime>
      <ItemIcon />
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


const PoscoBoard = ({navigation})=> {
  const theme=useContext(ThemeContext);

  //항목 목록 배열 상태 변수
  const [posts, setPosts] = useState([]);

  //마운트될 때 동작
  //post collection에서 읽어오기
  useEffect(()=> {

  }, [])

  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft: ({onPress}) => {
        return (
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={onPress}
          color={theme.ewha_green}/> 
        );
      },
      headerRight: () => {
        return (
          <Ionicons 
          name="search" 
          size={25}
          style={{marginRight:10,}}
          color={theme.ewha_green}
          onPress={()=> {}}/> 
        );
      },
    })
  })

  return (
    <Container>
      <FlatList 
      data={posts}
      renderItem={({item})=> <Item item={item} />}
      keyExtractor={item=>item['id'].toString()}
      windowSize={5}
      />
      <TouchableOpacity 
      onPress={()=>navigation.navigate('PostCreation')}

      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.ewha_green,
        width: 130,
        padding: 15,
        marginTop: 0,
        borderRadius: 30,
        position: 'absolute',
        bottom: 30,
        left: (Dimensions.get('window').width / 2)-(130/2),
      }}
      >
      <Text style={{
        fontSize: 20,
        color: 'white',
      }}>글 쓰기</Text>

      </TouchableOpacity>
    </Container>
  );
} 

export default PoscoBoard;