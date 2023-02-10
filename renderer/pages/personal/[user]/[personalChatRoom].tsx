import axios from "axios";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import { GetServerSideProps } from "next";
import { uuidv4 } from "@firebase/util";

import ChatForm from "../../../components/chat/chatElement/ChatForm";
import { getDataOnce, setData } from "../../../components/chat/api/firebaseApi";

const PersonalChatRoomPage = (props) => {
  const { roomId, fromUser, toUser, personalChatContent } = props;

  return (
    <div>
      <span className="block text-center my-3">Chat with '{toUser}'</span>
      <ChatContent
        roomId={roomId}
        chatData={personalChatContent}
        fromUser={fromUser}
        toUser={toUser}
      />
      <ChatForm roomId={roomId} fromUser={fromUser} toUser={toUser} />
    </div>
  );
};

export default PersonalChatRoomPage;

export const getServerSideProps = async (context) => {
  const user = context.params.user.replace(".", "");
  const target = context.params?.personalChatRoom;

  let roomId = user + target;
  const oppositeRoomId = target + user;

  const existedRoomCheck = async () => {
    let response = await getDataOnce(`personal-chat/${roomId}`);

    if (!response.exists()) {
      response = await getDataOnce(`personal-chat/${oppositeRoomId}`);
      roomId = oppositeRoomId;
    }
    return response;
  };

  const result = await existedRoomCheck();

  if (!result.exists()) {
    const key = uuidv4();

    const makeChatRoom = async () => {
      await setData(`personal-chat/${roomId}`, {});
    };

    const makeChatListToEachUser = async () => {
      await setData(`personal-chat-list/${user}`, { [key]: target });
      await setData(`personal-chat-list/${target}`, { [key]: user });
    };

    await makeChatRoom();
    await makeChatListToEachUser();
  }

  const messages = result.val();
  const personalChatContent = [];

  for (let key in messages) {
    personalChatContent.push(messages[key]);
  }

  return {
    props: { roomId, fromUser: user, toUser: target, personalChatContent },
  };
};
