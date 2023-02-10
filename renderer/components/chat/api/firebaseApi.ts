import { pushData } from "../../../lib/firebaseLib";

export const makeNewChatRoom = async (url: string, data = {}) => {
  await pushData(url, data);
};

export const addChatListToUser = async (url: string, target: {}) => {
  await pushData(url, target);
};
