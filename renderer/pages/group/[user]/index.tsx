import { useRouter } from "next/router";
import axios from "axios";
import CreateRoom from "../../../components/chat/groupChat/CreateRoom";
import GroupRoomList from "../../../components/chat/groupChat/GroupRoomList";

const GroupChatPage = (props) => {
  const router = useRouter();
  const userWithDot = router.query.user;
  const path = router.asPath;

  const groupChatList = props.groupChatList;

  const goToChatRoom = (targetRoomId) => {
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

export const getServerSideProps = async (context) => {
  const params = context.params.user;
  const user = params.replace(".", "");

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
