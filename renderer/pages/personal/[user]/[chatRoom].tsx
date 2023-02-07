import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { sendMessage } from "../../../components/chat/api/sendMessage";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatInput from "../../../components/chat/chatElement/ChatInput";
import { RootState } from "../../../store/store";

const ChatRoomPage = (props) => {
  const [target, chatData] = [props.target, props.personalChatContent];

  const [newChatData, setNewChatData] = useState(chatData);

  const user = useSelector((state: RootState) => state.login.loginUser);
  const fromUser = user.replace(".", "");
  const toUser = "11@gmailcom";

  const sendTime = new Date().getTime();

  const [inputValue, setInputValue] = useState<string | undefined>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      fromUser,
      toUser,
      sendTime,
      message: inputValue,
    };

    sendMessage(data);
    setNewChatData([...newChatData, data]);

    setInputValue("");
  };
  //그.. 받아온 메시지 데이터를 바로 보내는게 아니라, 상태값에 넣어라.
  //그리고 그것을 인풋에 넘겨줘서 인풋에서 추가할 수 있게.
  return (
    <div>
      <span className="block text-center my-3">Chat with '{target}'</span>
      <ChatContent chatData={newChatData} target={target} />
      <form onSubmit={submitHandler} className="text-center">
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
      </form>
    </div>
  );
};

export default ChatRoomPage;

export const getServerSideProps = async (context) => {
  const user = context.params.user.replace(".", "");
  const target = context.params.chatRoom;

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${user}/${target}.json`
  );
  const messages = response.data;
  const personalChatContent = [];

  for (let key in messages) {
    personalChatContent.push(messages[key]);
  }

  return { props: { target, personalChatContent } };
};
