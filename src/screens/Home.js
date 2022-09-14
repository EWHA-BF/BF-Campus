import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Image } from '../components';
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

//row container
const Row = styled.View`
  flex-direction: row;
  width: 95%;
  height: 30%;
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
  height: 120px;
`;

const CompoHeader = styled.View`
  flex: 1.5;
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
  

  // 마운트될 때 동작 - 앱 시작하고 화면 나타날 때 초기 한 번만!
  useEffect(() => {

    //user 문서 읽어오기 - lastPost 필드의 값 저장
    const lastPhotoFunc = async () => {
      const userRef = doc(DB, 'users', `${curUser.uid}`);
      const userSnap = await getDoc(userRef);
      const userLastPost= userSnap.data().lastPost; 
  
      // user의 lastPost 필드 값이 가장 최신 글이면 새 글 x
      if (last.id == userLastPost) {
        setText('새 글 x');
      }
      // 아니면 새 글 O
      else {
        setText('새 글');
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

    console.log('home, mount');

    lastPhotoFunc();

    return () => unsubscribe();
  }, []);

  return (
    <Container>
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
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      {/* 지도 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        activeOpacity={0.8}>
        {/* 이미지 url 수정 */}
        <Image
          url='https://firebasestorage.googleapis.com/v0/b/rn-chat-app-89bdb.appspot.com/o/ios-icon.png?alt=media'
          containerStyle={{
            width: (Dimensions.get('window').width) - 20 * 3,
            height: 220,
            resizeMode: 'stretch',
            borderRadius: 15,
          }} />
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
          <StyledText style={{ flex: 2, textAlign: 'center', paddingTop: 20, fontSize: 16, color: 'grey', paddingHorizontal: 20, }}>캠퍼스 내 긴급한 소식을 알려 드립니다!</StyledText>
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
          <StyledText style={{ flex: 2, textAlign: 'center', paddingTop: 20, fontSize: 16, color: 'grey', paddingHorizontal: 20, }}>원하는 건물의 정보만 빠르게 확인하세요!</StyledText>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export default Home;