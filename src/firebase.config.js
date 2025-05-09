import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9lJ3BSz-ZchU0Gz-NmUt_sQsOr7WGFtk",
  authDomain: "chat-app-21f8d.firebaseapp.com",
  projectId: "chat-app-21f8d",
  storageBucket: "chat-app-21f8d.appspot.com", // fixed typo: .app → .app**spot**.com
  messagingSenderId: "341967649527",
  appId: "1:341967649527:web:e9c055521cf8e59598b1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
