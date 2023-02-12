import axios from "axios";
import { useEffect, useState } from "react";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import InviteForm from "../../../components/chat/groupChat/invite/InviteForm";
import ChatForm from "../../../components/chat/chatElement/ChatForm";
import { RoomDataType, MemberType, MessageType } from "../../../type/chat";

import { getGroupChatData } from "../../../components/chat/groupChat/api/getGroupChatData";
import { useRouter } from "next/router";

interface GroupDataType {
  fromUser: string;
  roomId: string;
  members: MemberType[];
  messages: MessageType[];
}

const GroupChatRoomPage = () => {
  const router = useRouter();
  const user = router.query.user as string;
  const roomId = router.query.groupChatRoom as string;

  const [groupChatData, setGroupChatData] = useState<
    GroupDataType | undefined
  >();

  const groupChatDataHandler = async () => {
    const { members, messages } = await getGroupChatData(roomId);
    const data = { fromUser: user, roomId, members, messages };
    setGroupChatData(data);
  };

  useEffect(() => {
    groupChatDataHandler();
  }, []);

  if (!groupChatData) {
    return <div>로딩 중</div>;
  }

  const { fromUser, members, messages } = groupChatData;

  return (
    <div>
      <span className="block text-center my-3">Chat in '{roomId}'</span>
      <InviteForm roomId={roomId} members={members} />
      <ChatContent roomId={roomId} chatData={messages} fromUser={fromUser} />
      <ChatForm roomId={roomId} fromUser={fromUser} />
    </div>
  );
};

export default GroupChatRoomPage;
