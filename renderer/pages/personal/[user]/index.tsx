import axios from "axios";
import { useRouter } from "next/router";
import List from "../../../components/list/List";

const PersonalChatPage = (props) => {
  const router = useRouter();
  const path = router.asPath;
  const personalChatList = props.personalChatList;

  const goToChatRoom = (targetUser) => {
    router.push(`${path}/${targetUser}`);
  };

  return (
    <div>
      {personalChatList.map((targetUser) => {
        return (
          <div
            key={targetUser}
            onClick={() => {
              goToChatRoom(targetUser);
            }}
          >
            <List user={targetUser} />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalChatPage;

export const getServerSideProps = async (context) => {
  const params = context.params.user;
  const user = params.replace(".", "");

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${user}.json`
  );

  const personalChatList = [];

  for (let list in response.data) {
    personalChatList.push(list);
  }

  return { props: { personalChatList } };
};
