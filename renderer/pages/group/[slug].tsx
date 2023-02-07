import axios from "axios";

const GroupChatPage = (props) => {
  const personalChatList = props.personalChatList;

  return (
    <div>
      {personalChatList.map((ele) => {
        return <div>{ele}</div>;
      })}
    </div>
  );
};

export default GroupChatPage;

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
