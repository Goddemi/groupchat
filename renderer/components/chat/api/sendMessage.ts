import axios from "axios";

export const sendMessage = (data) => {
  const { fromUser, toUser } = data;

  // if toUser > 2 그룹일 때는 이렇게.

  const url = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${fromUser}/${toUser}.json`;
  const oppositeUrl = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${toUser}/${fromUser}.json`;

  try {
    axios.post(url, data);
    axios.post(oppositeUrl, data);
  } catch (error) {
    console.log(error);
  }
};
