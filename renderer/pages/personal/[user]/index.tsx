import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import List from "../../../components/elements/List";
import { getChatList } from "../../../components/chat/api/firebaseApi";

interface Props {
  personalChatList: string[];
}

const PersonalChatList = () => {
  const router = useRouter();
  const path = router.asPath;
  const user = router.query.user as string;

  const [personalChatList, setPersonalChatList] = useState<
    string[] | undefined
  >([]);

  const getPersonalChatListHandler = async () => {
    const response = await getChatList("personal", user);
    setPersonalChatList(response);
  };

  useEffect(() => {
    getPersonalChatListHandler();
  }, []);

  const goToChatRoom = (targetUser: string) => {
    router.push(`${path}/${targetUser}`);
  };

  if (!personalChatList) {
    return <div> 로딩 중</div>;
  }

  return (
    <div>
      <div className="my-3 text-center">대화중인 방 리스트</div>
      {personalChatList?.map((targetUser) => {
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
