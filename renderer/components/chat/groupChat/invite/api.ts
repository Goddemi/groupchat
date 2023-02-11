import axios from "axios";

export const postMemberListToRoomDatabase = (
  roomId: string,
  data: { [key: string]: string }
) => {
  axios.post(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}/members.json`,
    data
  );
};

export const postGroupChatRoomToInvitedPerson = (
  roomId: string,
  formattedId: string
) => {
  axios.post(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${formattedId}.json`,
    { roomId }
  );
};
