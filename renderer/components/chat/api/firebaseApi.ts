import axios from "axios";
import { pushData } from "../../../lib/firebaseLib";
import {
  PERSONALCHATLIST_CONFIG,
  GROUPCHATLIST_CONFIG,
} from "../../../config/config";

export const makeNewChatRoom = async (url: string, data = {}) => {
  await pushData(url, data);
};

export const addChatListToUser = async (url: string, target: {}) => {
  await pushData(url, target);
};

export const getChatList = async (
  type: "personal" | "group",
  userWithDot: string
) => {
  if (!userWithDot) {
    return [];
  }

  const user = userWithDot.replace(".", "");

  try {
    let response;

    if (type === "personal") {
      response = await axios(PERSONALCHATLIST_CONFIG(user));
    }
    if (type === "group") {
      response = await axios(GROUPCHATLIST_CONFIG(user));
    }

    const result = response.data;
    const chatList = [];

    for (let list in result) {
      chatList.push(result[list].roomId);
    }
    return chatList;
  } catch (error) {
    console.error(error);
    return [];
  }
};
