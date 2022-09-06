import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

const app = initializeApp(config);
export const auth = getAuth(app);
// export const database= getDatabase(app);