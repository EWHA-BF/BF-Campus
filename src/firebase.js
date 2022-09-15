import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore, collection, addDoc, setDoc, doc,updateDoc  } from "firebase/firestore";

const app = initializeApp(config);
export const auth = getAuth(app);

//DB 가져오기
export const DB = getFirestore(app);

//storage 가져오기
export const storage = getStorage(app);


//현재 사용자 정보 가져오기
export const getCurUser = () => {
  const {uid, displayName, email} = auth.currentUser;
  return {uid, displayName, email};
}





//글 쓰기 함수
export const createPost = async({boardId, title, desc, isEmer, image, uid, userName}) => {
  try {
    //받은 boardId의 'posts' collection에 document 생성

     // id 자동 지정 (addDoc)
     const docRef= await addDoc(collection(DB, "boards", `${boardId}/posts`), {
      uid: uid,
      userName: userName,
      title: title,
      description: desc,
      createdAt: Date.now(),
      isEmer: isEmer, 
      image: image, 
      id: '',
     });
      

     //자동 지정된 id로 id 필드 업데이트
     const curDocRef = doc(DB, "boards", `${boardId}/posts/${docRef.id}`);
     await updateDoc(curDocRef, {
      id: docRef.id,
  
    });

    return docRef.id;
    

     // id를 uid로 지정해서 올리는 방법
    // ** id 지정해서 올리기 
    // await setDoc(doc(DB, "boards", `${boardId}/posts/${uid}`), {
    //   id: uid,
    //   title: title,
    //   description: desc,
    //   createdAt: Date.now(),
    //   isEmer: isEmer, 
    //   image: image, 
    //   userName: userName
    // });
    // uid 반환
  } 
  catch (e) {
    console.error(e.message);
  }
}


//user 저장 함수
export const createUser = async({uid, nickname}) => {
  try {
    //'users' collection에 document 생성

    // id 지정해서 올리기 (uid로)
    await setDoc(doc(DB, "users", `${uid}`), {
      id: uid,
      nickname: nickname,
      myBoard: [],
      lastPost: "ss",
    });
    // uid 반환
    return uid;
  } 
  catch (e) {
    console.error(e.message);
  }
}