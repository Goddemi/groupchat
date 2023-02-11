import axios from "axios";
import { useRouter } from "next/router";
import List from "../../../components/elements/List";
import { GetStaticPropsContext } from "next";

interface Props {
  personalChatList: string[];
}

const PersonalChatList = ({ personalChatList }: Props) => {
  const router = useRouter();
  const path = router.asPath;

  const goToChatRoom = (targetUser: string) => {
    router.push(`${path}/${targetUser}`);
  };

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

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const params = context.params?.user;

  if (!params) {
    return {
      props: { personalChatList: [] },
    };
  }

  const user = (params as string).replace(".", "");
  try {
    const response = await axios(
      `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat-list/${user}.json`
    );

    const personalChatList = [];

    for (let list in response.data) {
      const targetId = response.data[list].target;
      personalChatList.push(targetId);
    }
    return { props: { personalChatList } };
  } catch (error) {
    console.error(error);
    return {
      props: { personalChatList: [] },
    };
  }
};
