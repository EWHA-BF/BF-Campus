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
  return {uid, displayName, email};
}





//글 쓰기 함수
export const createPost = async({boardId, title, desc}) => {
  try {
    //받은 boardId의 'posts' collection에 document 생성

    // ** id 지정해서 올리기 
    await setDoc(doc(DB, "boards", `${boardId}/posts`, 'uid'), {
      id: 'uid',
      title: title,
      description: desc,
      createdAt: Date.now() 
    });
    // post id 반환
    return 'uid';

  } 
  catch (e) {
    console.error(e.message);
  }
}

//user 저장 함수
export const createUser = async({uid, nickname}) => {
  try {
    //'users' collection에 document 생성

    // ** id 지정해서 올리기 (uid로)
    await setDoc(doc(DB, "users", `${uid}`), {
      id: uid,
      nickname: nickname,
      myBoard: [],
    });
    // uid 반환
    return uid;
  } 
  catch (e) {
    console.error(e.message);
  }
}