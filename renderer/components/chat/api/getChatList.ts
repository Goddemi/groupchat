import axios from "axios";
import {
  PERSONALCHATLIST_CONFIG,
  GROUPCHATLIST_CONFIG,
} from "../../../config/config";

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
    const chatList = [];

    if (type === "personal") {
      response = await axios(PERSONALCHATLIST_CONFIG(user));
      const result = response.data;

      for (let list in result) {
        chatList.push(result[list].target);
      }
    }
    if (type === "group") {
      response = await axios(GROUPCHATLIST_CONFIG(user));
      const result = response.data;

      for (let list in result) {
        chatList.push(result[list].roomId);
      }
    }

    return chatList;
  } catch (error) {
    console.error(error);
    return [];
  }
};
