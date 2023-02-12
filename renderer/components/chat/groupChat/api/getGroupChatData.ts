import axios from "axios";
import { GROUPCHATDATA_CONFIG } from "../../../../config/config";
import { RoomDataType } from "../../../../type/chat";

export const getGroupChatData = async (roomId: string) => {
  const response = await axios(GROUPCHATDATA_CONFIG(roomId));
  const roomData: RoomDataType = response.data;

  const members: any[] = [];
  const messages: any[] = [];

  for (let key in roomData.members) {
    members.push(roomData.members[key]);
  }

  for (let key in roomData.messages) {
    messages.push(roomData.messages[key]);
  }

  return { members, messages };
};
