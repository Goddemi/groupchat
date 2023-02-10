import axios from "axios";
import { ref, set } from "firebase/database";
import { db } from "../../../firebase";

export const sendMessage = (data, target) => {
  // 채팅 대상이 있을 경우 1:1채팅
  if (target) {
    const key = Object.keys(data)[0];
    const { fromUser, toUser } = data[key];
    const url = `/personal-chat/${fromUser}/${toUser}`;
    const oppositeUrl = `/personal-chat/${toUser}/${fromUser}`;

    try {
      set(ref(db, url), data);
      set(ref(db, oppositeUrl), data);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  // 채팅 대상이 없을 경우 그룹채팅
  const { roomId } = data;
  const url = `/group-chat/${roomId}/messages`;
  try {
    axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
