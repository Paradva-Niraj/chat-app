import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9lJ3BSz-ZchU0Gz-NmUt_sQsOr7WGFtk",
  authDomain: "chat-app-21f8d.firebaseapp.com",
  projectId: "chat-app-21f8d",
  storageBucket: "chat-app-21f8d.firebasestorage.app",
  messagingSenderId: "341967649527",
  appId: "1:341967649527:web:e9c055521cf8e59598b1f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };