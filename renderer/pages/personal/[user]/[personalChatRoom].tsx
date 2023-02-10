import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatForm from "../../../components/chat/chatElement/ChatForm";
import {
  addChatListToUser,
  getDataOnce,
  makeNewChatRoom,
} from "../../../components/chat/api/firebaseApi";

const PersonalChatRoomPage = (props) => {
  const { roomId, fromUser, toUser, personalChatContent } = props;

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

export const getServerSideProps = async (context) => {
  const user = context.params.user.replace(".", "");
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
