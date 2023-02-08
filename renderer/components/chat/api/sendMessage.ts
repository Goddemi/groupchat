import axios from "axios";

export const sendMessage = (data) => {
  if (data.toUser) {
    const { fromUser, toUser } = data;
    const url = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${fromUser}/${toUser}.json`;
    const oppositeUrl = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${toUser}/${fromUser}.json`;

    try {
      axios.post(url, data);
      axios.post(oppositeUrl, data);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  const { roomId } = data;
  const url = `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}/messages.json`;
  try {
    axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
