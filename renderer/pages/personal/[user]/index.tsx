import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChatList } from "../../../components/chat/api/getChatList";
import List from "../../../components/elements/List";

const PersonalChatList = () => {
  const router = useRouter();
  const path = router.asPath;
  const user = router.query.user as string;

  const [personalChatList, setPersonalChatList] = useState<
    string[] | undefined
  >([]);

  const getChatListHandler = async () => {
    const response = await getChatList("personal", user);
    console.log(response);
    setPersonalChatList(response);
  };

  const goToChatRoom = (targetUser: string) => {
    router.push(`${path}/${targetUser}`);
  };

  useEffect(() => {
    getChatListHandler();
  }, []);

  if (!personalChatList) {
    return <div> 로딩 중</div>;
  }

  return (
    <div>
      <div className="my-3 text-center">대화중인 방 리스트</div>
      {personalChatList.map((targetUser) => {
        return (
          <div
            key={targetUser}
            onClick={() => {
              goToChatRoom(targetUser);
            }}
          >
            <List targetId={targetUser} />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalChatList;
