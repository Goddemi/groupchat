import { child, get, onValue, push, ref } from "firebase/database";
import { db } from "../firebase";
import { DatabaseReference } from "firebase/database";
import { MessageType } from "../type/chat";
export const getDataOnce = async (url: string) => {
  const dbRef = ref(db);
  const response = await get(child(dbRef, url));
  return response;
};

export const pushData = async (url: string, data: object) => {
  const response = await push(ref(db, url), data);
  return response;
};

export const getLiveData = (
  messageRef: DatabaseReference,
  setUpdateMethod: any
) => {
  onValue(messageRef, (snapshot) => {
    const messagesData = snapshot.val() || {};
    const newMessage = Object.values(messagesData);
    setUpdateMethod([...newMessage]);
  });
};
