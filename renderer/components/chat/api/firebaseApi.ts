import { child, get, onValue, ref, set } from "firebase/database";
import { db } from "../../../firebase";

export const getDataLive = (messageRef, setUpdateMethod) => {
  onValue(messageRef, (snapshot) => {
    const messagesData = snapshot.val();
    const newMessage = Object.values(messagesData);
    setUpdateMethod((prevMessages) => [...prevMessages, ...newMessage]);
  });
};

export const getDataOnce = async (url: string) => {
  const dbRef = ref(db);
  const response = await get(child(dbRef, url));
  return response;
};

export const setData = async (url: string, data) => {
  const response = await set(ref(db, url), data);
  return response;
};
