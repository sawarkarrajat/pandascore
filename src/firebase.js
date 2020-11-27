import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB8NpXCgyr78Hh9Z660wlPZwMBjVoPXu0M",
  authDomain: "pandascore-f0b76.firebaseapp.com",
  databaseURL: "https://pandascore-f0b76.firebaseio.com",
  projectId: "pandascore-f0b76",
  storageBucket: "pandascore-f0b76.appspot.com",
  messagingSenderId: "1076371047597",
  appId: "1:1076371047597:web:42f518f04e553186e2f224",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
