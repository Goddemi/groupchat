import { useRouter } from "next/router";
import axios from "axios";
import CreateRoom from "../../../components/chat/groupChat/CreateRoom";
import GroupRoomList from "../../../components/chat/groupChat/GroupRoomList";
import { GetServerSidePropsContext } from "next";

interface Props {
  groupChatList: string[];
}

const GroupChatPage = ({ groupChatList }: Props) => {
  const router = useRouter();
  const userWithDot = router.query.user as string;
  const path = router.asPath;

  const goToChatRoom = (targetRoomId: string) => {
    router.push(`${path}/${targetRoomId}`);
  };

  return (
    <div>
      <CreateRoom goToChatRoom={goToChatRoom} userWithDot={userWithDot} />
      <GroupRoomList
        goToChatRoom={goToChatRoom}
        groupChatList={groupChatList}
      />
    </div>
  );
};

export default GroupChatPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const params = context.params?.user;
  const user = (params as string).replace(".", "");

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${user}.json`
  );
  const result = response.data;

  const groupChatList = [];

  for (let key in result) {
    groupChatList.push(result[key].roomId);
  }

  return { props: { groupChatList } };
};
