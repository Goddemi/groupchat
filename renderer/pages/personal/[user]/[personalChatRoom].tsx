import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatForm from "../../../components/chat/chatElement/ChatForm";
import {
  addChatListToUser,
  makeNewChatRoom,
} from "../../../components/chat/api/firebaseApi";
import { getDataOnce } from "../../../lib/firebaseLib";
import { GetServerSidePropsContext } from "next";
import { MessageType } from "../../../type/chat";
interface Props {
  roomId: string;
  fromUser: string;
  toUser: string | null;
  personalChatContent: MessageType[];
}

const PersonalChatRoomPage = ({
  roomId,
  fromUser,
  toUser,
  personalChatContent,
}: Props) => {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = (context.params?.user as string).replace(".", "");
  const target = context.params?.personalChatRoom;

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

  //존재하지 않으면 만드는데 존재 하지 않는다고 위에서 체크한 것. result를 확인.
  if (!result.exists()) {
    await makeNewChatRoom(`personal-chat/${roomId}`);
    await addChatListToUser(`personal-chat-list/${user}`, { target });
    await addChatListToUser(`personal-chat-list/${target}`, { target: user });
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
