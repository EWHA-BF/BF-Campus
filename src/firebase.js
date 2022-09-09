import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const app = initializeApp(config);
export const auth = getAuth(app);
export const database= getDatabase(app);


//현재 사용자 정보 가져오기
export const getCurUser = () => {
  const {uid, displayName, email} = auth.currentUser;
  console.log(auth.currentUser);
  return {uid, displayName, email};
}