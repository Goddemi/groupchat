import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreateRoom from "../../../components/chat/groupChat/CreateRoom";
import GroupRoomList from "../../../components/chat/groupChat/GroupRoomList";
import { getChatList } from "../../../components/chat/api/firebaseApi";

const GroupChatPage = () => {
  const router = useRouter();
  const userWithDot = router.query.user as string;
  const path = router.asPath;

  const [groupChatList, setGroupChatList] = useState<string[] | undefined>([]);

  const getChatListHandler = async () => {
    const response = await getChatList("group", userWithDot);
    setGroupChatList(response);
  };

  useEffect(() => {
    getChatListHandler();
  }, []);

  const goToChatRoom = (targetRoomId: string) => {
    router.push(`${path}/${targetRoomId}`);
  };

  if (!groupChatList) {
    return <div>로딩 중</div>;
  }

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
