import axios from "axios";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import InviteForm from "../../../components/chat/groupChat/invite/InviteForm";
import ChatForm from "../../../components/chat/chatElement/ChatForm";
import { GetServerSidePropsContext } from "next";
import { RoomDataType } from "../../../type/chat";
import { MemberType } from "../../../type/chat";
import { MessageType } from "../../../type/chat";
interface Props {
  fromUser: string;
  roomId: string;
  members: MemberType[];
  messages: MessageType[];
}

const GroupChatRoomPage = ({ fromUser, roomId, members, messages }: Props) => {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = (context.params?.user as string).replace(".", "");
  const roomId = context.params?.groupChatRoom;

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}.json`
  );

  const roomData: RoomDataType = response.data;

  const members: any[] = [];
  const messages: any[] = [];

  for (let key in roomData.members) {
    members.push(roomData.members[key]);
  }

  for (let key in roomData.messages) {
    messages.push(roomData.messages[key]);
  }

  return { props: { fromUser: user, roomId, members, messages } };
};
