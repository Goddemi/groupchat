import { child, get, onValue, push, ref, set } from "firebase/database";
import { db } from "../../../firebase";

export const getLiveData = (messageRef, setUpdateMethod) => {
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

export const makeNewChatRoom = async (url: string, data = {}) => {
  await pushData(url, data);
};

export const addChatListToUser = async (url: string, target) => {
  await pushData(url, target);
};
//target이 아니라 roomId로 해야 하나?
