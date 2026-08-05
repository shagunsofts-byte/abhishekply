import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Read from env vars (VITE_ prefix is required for Vite to expose them to the browser)
// Fallback values allow the project to run in AI Studio / demo mode without a .env file
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyCAMxZgVDBJ37NyX0gStYe-jbtSlH-BDI8",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "avian-theme-t9pl1.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "avian-theme-t9pl1",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "avian-theme-t9pl1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| "1096849659039",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:1096849659039:web:2b09199c709a750ec1beaa",
};

const dbId = import.meta.env.VITE_FIREBASE_DB_ID
  || "ai-studio-abhishekplyhardw-e663fec0-6eaa-4f85-917c-50b2be1c9c65";

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, dbId);

export const auth = getAuth(app);
