import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Image, Button } from '../components';
import { TouchableOpacity, View, Dimensions, Modal, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DB, getCurUser } from '../firebase';
import { collectionGroup, query, where, getDocs, onSnapshot, orderBy, limit, getDoc, doc, updateDoc } from "firebase/firestore";




const Container = styled.SafeAreaView`
  flex : 1;
  background-color: ${({ theme }) => theme.bgColor};
  align-items: center;
  justify-content: space-evenly;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const compoWidth = Dimensions.get('window').width - 20 * 3;

const StyledCompo = styled.View`
  background-color: ${({ theme }) => theme.bgColor};
  border: 2px solid ${({ theme }) => theme.errorText};
  border-radius: 15px;
  width: ${compoWidth}px;
  height: 100px;
`;

const CompoHeader = styled.View`
  flex: 1.8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ theme }) => theme.errorText};
  flex-direction: row;
  align-items: center;
`;


const Home = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const curUser = getCurUser();
  const [modalVisible, setModalVisible] = useState(false);
  // modal에 렌더링할 text
  const [text, setText] = useState('');
  // 긴급 게시판에 올라온 가장 최신 글
  let last;
  
  // 마운트될 때 동작 
  useEffect(() => {

    //user 문서 읽어오기 - lastPost 필드의 값 저장
    const lastPhotoFunc = async () => {
      const userRef = doc(DB, 'users', `${curUser.uid}`);
      const userSnap = await getDoc(userRef);
      const userLastPost= userSnap.data().lastPost; 
  
      // user의 lastPost 필드 값이 가장 최신 글이면 새 글 x
      if (last.id == userLastPost) {
        setText('긴급 게시판에 등록된 새 글이 없습니다.');
      }
      // 아니면 새 글 O
      else {
        setText('긴급 게시판에 등록된 새 글이 있습니다.');
        // user의 lastPost 필드 업데이트
        const lastPostRef = doc(DB, 'users', `${curUser.uid}`);
        updateDoc(lastPostRef, {
          lastPost: last.id
        });
      }
    }

     // 가장 최근에 올라온 긴급 문서 가져오기
    const q = query(collectionGroup(DB, 'posts'), where('isEmer', '==', true), orderBy('createdAt', 'desc'), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        last = doc.data();
      });
    });

    lastPhotoFunc();

    return () => unsubscribe();
  }, []);


  return (
    <Container>
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, styles.buttonCustom]}
        onPress={() => setModalVisible(true)}
      >
      <Ionicons
            name="megaphone"
            size={18}
            color='#E74B3C'
            style={{marginRight: 10}} />
      <Text style={[styles.textStyle, styles.textCustom]}>긴급 소식 확인</Text>
      </Pressable>

      {/* 지도 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#fff',
          borderRadius: 15,
          //iOS
          shadowColor: "#000000", 
          shadowOpacity: 0.2,
          shadowRadius: 7,
          shadowOffset: { width: 2, height: 2 }, 
          //Android
          elevation: 5,
        }}
        >
        <Image
          url='https://i.imgur.com/thtIImL.jpg'
          containerStyle={{
            width: (Dimensions.get('window').width) - 20 * 3,
            height: 220,
            resizeMode: 'stretch',
            borderRadius: 15,
            opacity: 0.6,
          }} />
        <TouchableOpacity
          // 지도 보기 버튼
          onPress={ ()=>
            navigation.navigate('Map')
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.ewha_green,
            width: 120,
            padding: 10,
            marginTop: 0,
            borderRadius: 7,
            position: 'absolute',
            bottom: 15,
            left: (((Dimensions.get('window').width) - 20 * 3) / 2)-(120/2),
          }}
          >
          <Text style={{
            fontSize: 13,
            color: 'white',
            fontWeight: '600',
          }}>캠퍼스 지도 보기</Text>
          </TouchableOpacity>
      </TouchableOpacity>

      {/*긴급 게시판*/}
      <TouchableOpacity
        onPress={() => navigation.navigate('EmergencyBoard')}
        activeOpacity={0.8}>
        <StyledCompo>
          <CompoHeader>
            <Ionicons
              name="notifications"
              size={22}
              style={{ flex: 1, marginLeft: 15, }}
              color='white' />
            <StyledText style={{ color: 'white', flex: 6, fontSize: 18, fontWeight: 'bold' }}>긴급 게시판</StyledText>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={25}
              style={{ flex: 1 }}
              color='white' />
          </CompoHeader>
          <StyledText style={{ flex: 2, textAlign: 'left', paddingTop: 20, fontSize: 14, color: 'grey', paddingHorizontal: 20, }}>캠퍼스 내 긴급한 소식을 알려 드립니다!</StyledText>
        </StyledCompo>
      </TouchableOpacity>


      {/*즐겨찾는 게시판*/}
      <TouchableOpacity
        onPress={() => navigation.navigate('MyBoards')}
        activeOpacity={0.8}>
        <StyledCompo style={{ borderColor: theme.ewha_green }}>
          <CompoHeader style={{ backgroundColor: theme.ewha_green }}>
            <Ionicons
              name="heart"
              size={22}
              style={{ flex: 1, marginLeft: 15, }}
              color='white' />
            <StyledText style={{ color: 'white', flex: 6, fontSize: 18, fontWeight: 'bold' }}>즐겨찾는 게시판</StyledText>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={25}
              style={{ flex: 1 }}
              color='white' />
          </CompoHeader>
          <StyledText style={{ flex: 2, textAlign: 'left', paddingTop: 20, fontSize: 14, color: 'grey', paddingHorizontal: 20, }}>원하는 건물의 정보만 빠르게 확인하세요!</StyledText>
        </StyledCompo>
      </TouchableOpacity>

    </Container>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  // modal 창
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: 300,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  //전체 버튼
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2
  },
  // showModal 버튼
  buttonOpen: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor : '#E74B3C',
    shadowColor: '#E74B3C',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  // 확인 버튼
  buttonClose: {
    backgroundColor: "#E74B3C",
  },
  // showModal 버튼 
  buttonCustom: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 전체 텍스트
  textStyle: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  //showModal 버튼 텍스트
  textCustom : {
    color: '#E74B3C',
    fontWeight: "bold",
    fontSize: 16, 
  },
  // modal 화면 텍스트
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: "center"
  }
});


export default Home;