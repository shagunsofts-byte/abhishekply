import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "avian-theme-t9pl1",
  appId: "1:1096849659039:web:2b09199c709a750ec1beaa",
  apiKey: "AIzaSyCAMxZgVDBJ37NyX0gStYe-jbtSlH-BDI8",
  authDomain: "avian-theme-t9pl1.firebaseapp.com",
  storageBucket: "avian-theme-t9pl1.firebasestorage.app",
  messagingSenderId: "1096849659039",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-abhishekplyhardw-e663fec0-6eaa-4f85-917c-50b2be1c9c65");
export const auth = getAuth(app);
