export const USERLIST_CONFIG =
  "https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/user.json";

export const PERSONALCHATLIST_CONFIG = (user: string) => {
  return `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat-list/${user}.json`;
};

export const GROUPCHATLIST_CONFIG = (user: string) => {
  return `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${user}.json`;
};

export const GROUPCHATDATA_CONFIG = (roomId: string) => {
  return `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}.json`;
};
