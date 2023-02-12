import { getDataOnce } from "../../../lib/firebaseLib";

export const getPersonalChatData = async (
  userWithDot: string,
  target: string
) => {
  const user = userWithDot.replace(".", "");

  let roomId = user + target;
  const oppositeRoomId = target + user;

  const existedRoomCheckAndGetData = async () => {
    let response = await getDataOnce(`personal-chat/${roomId}`);

    if (!response.exists()) {
      response = await getDataOnce(`personal-chat/${oppositeRoomId}`);
      roomId = oppositeRoomId;
    }
    return response;
  };

  const result = await existedRoomCheckAndGetData();
  return { result, roomId };
};
