// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "../config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.apiKey.authDomain,
  projectId: config.firebaseConfig.apiKey.projectId,
  storageBucket: config.firebaseConfig.apiKey.storageBucket,
  messagingSenderId: config.firebaseConfig.apiKey.messagingSenderId,
  appId: config.firebaseConfig.apiKey.appId,
  measurementId: config.firebaseConfig.apiKey.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;