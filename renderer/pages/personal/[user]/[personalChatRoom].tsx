import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatForm from "../../../components/chat/chatElement/ChatForm";
import { getPersonalChatData } from "../../../components/chat/personalChat/api";
import {
  addChatListToUser,
  makeNewChatRoom,
} from "../../../components/chat/api/firebaseApi";
import { MessageType } from "../../../type/chat";

interface PersonalDataType {
  roomId: string;
  fromUser: string;
  toUser: string | null;
  personalChatContent: MessageType[];
}

const PersonalChatRoomPage = () => {
  const router = useRouter();

  const user = router.query.user;
  const target = router.query.personalChatRoom;

  const [personalChatData, setPerSonalChatData] = useState<
    PersonalDataType | undefined
  >();

  const personalChatDataHandler = async () => {
    const { result, roomId } = await getPersonalChatData(
      user as string,
      target as string
    );

    if (!result.exists()) {
      await makeNewChatRoom(`personal-chat/${roomId}`);
      await addChatListToUser(`personal-chat-list${user}`, { target });
      await addChatListToUser(`personal-chat-list${target}`, { target: user });
    }

    const messages = result.val();
    const personalChatContent = [];

    for (let key in messages) {
      personalChatContent.push(messages[key]);
    }

    const data = {
      roomId,
      fromUser: user as string,
      toUser: target as string,
      personalChatContent,
    };

    setPerSonalChatData(data);
  };

  useEffect(() => {
    personalChatDataHandler();
  }, []);

  if (!personalChatData) {
    return <div>로딩 중</div>;
  }

  const { roomId, fromUser, toUser, personalChatContent } = personalChatData;

  return (
    <div>
      <span className="block text-center my-3">Chat with '{toUser}'</span>
      <ChatContent
        roomId={roomId}
        chatData={personalChatContent}
        fromUser={fromUser}
      />
      <ChatForm roomId={roomId} fromUser={fromUser} toUser={toUser} />
    </div>
  );
};

export default PersonalChatRoomPage;
