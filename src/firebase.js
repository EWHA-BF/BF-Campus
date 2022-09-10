import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
export const createPost = async({title, desc}) => {
  try {
    //'posts' collection에 document 생성
    const newPostRef = await addDoc(collection(DB, "posts"), {
      title,
      description: desc,
      createdAt: Date.now(),
    });
    //post id 반환
    return newPostRef.id;
  } 
  catch (e) {
    console.error(e.message);
  }
}