import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAu450eJU9Y5vGEzxjjY6uLraGaW8dNPEk",
  authDomain: "nextron-chat-a24da.firebaseapp.com",
  projectId: "nextron-chat-a24da",
  storageBucket: "nextron-chat-a24da.appspot.com",
  messagingSenderId: "846295177446",
  appId: "1:846295177446:web:bfe434dea8e3f58d5e8327",
  databaseURL:
    "https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
