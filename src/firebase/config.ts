import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "weather-app-504c1.firebaseapp.com",
  projectId: "weather-app-504c1",
  storageBucket: "weather-app-504c1.appspot.com",
  messagingSenderId: "1096708651095",
  appId: "1:1096708651095:web:8098db6cce84a98f814b12",
  measurementId: "G-G3J1SM5JPJ",
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
