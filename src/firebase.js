import { initializeApp } from "firebase/app";
import config from '../firebase.json';
import { getAuth } from "firebase/auth";

const app = initializeApp(config);
export const auth = getAuth(app);