import axios from "axios";

export const sendMessage = (data) => {
  const { fromUser, toUser, sendTime, message } = data;

  // if toUser > 2 그룹일 때는 이렇게.

  const url = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${fromUser}/${toUser}.json`;

  axios.post(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${fromUser}/${toUser}.json`,
    data
  );
};
