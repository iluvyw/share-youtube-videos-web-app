import { getLocalEnvVariable } from "../utils/localEnv";

// For Firebase JS SDK v7.20.0 and later, measurementId is optionale
const apiKey = getLocalEnvVariable("VITE_FIREBASE_API_KEY");

export const firebaseConfig = {
  apiKey,
  authDomain: "share-videos-web-app.firebaseapp.com",
  projectId: "share-videos-web-app",
  storageBucket: "share-videos-web-app.appspot.com",
  messagingSenderId: "4266442125",
  appId: "1:4266442125:web:0ddfe630734d970d0e51c4",
  measurementId: "G-9QGFPVLKHF",
};
