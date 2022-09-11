import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

const app = initializeApp(config);
export const auth = getAuth(app);

//DB 가져오기
export const DB = getFirestore(app);


//현재 사용자 정보 가져오기
export const getCurUser = () => {
  const {uid, displayName, email} = auth.currentUser;
  console.log(auth.currentUser);
  return {uid, displayName, email};
}





//글 쓰기 함수
export const createPost = async({boardId, title, desc}) => {
  try {
    //받은 boardId의 'posts' collection에 document 생성
    console.log(boardId);
    // 마지막 부분에 message id
    // boardID가 undefined로 지정됨
    const docRef = doc(DB, `boards/${boardId}/posts`, '3');
    await setDoc(docRef, { 
      title,
      description: desc,
      createdAt: Date.now() 
    });


  } 
  catch (e) {
    console.error(e.message);
  }
}