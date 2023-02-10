import { child, get, onValue, push, ref, set } from "firebase/database";
import { db } from "../../../firebase";

export const getDataLive = (messageRef, setUpdateMethod) => {
  onValue(messageRef, (snapshot) => {
    const messagesData = snapshot.val() || {};
    const newMessage = Object.values(messagesData);
    setUpdateMethod([...newMessage]);
  });
};

export const getDataOnce = async (url: string) => {
  const dbRef = ref(db);
  const response = await get(child(dbRef, url));
  return response;
};

export const pushData = async (url: string, data) => {
  const response = await push(ref(db, url), data);
  return response;
};
