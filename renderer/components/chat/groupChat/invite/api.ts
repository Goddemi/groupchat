import axios from "axios";

export const postMemberListToRoomDatabase = (roomId, data) => {
  axios.post(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}/members.json`,
    data
  );
};

export const postGroupChatRoomToInvitedPerson = (roomId, formattedId) => {
  axios.post(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${formattedId}.json`,
    { roomId }
  );
};
