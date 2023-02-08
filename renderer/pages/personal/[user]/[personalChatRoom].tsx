import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { sendMessage } from "../../../components/chat/api/sendMessage";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatInput from "../../../components/chat/chatElement/ChatInput";
import { RootState } from "../../../store/store";
import { GetServerSideProps } from "next";
import { emailFormatter } from "../../../lib/emailFomatter";

const PersonalChatRoomPage = (props) => {
  const [target, chatData] = [props.target, props.personalChatContent];

  const [newChatData, setNewChatData] = useState(chatData);

  const user = useSelector((state: RootState) => state.login.loginUser);
  const fromUser = emailFormatter(user);
  const toUser = target;

  const sendTime = new Date().getTime();

  const [inputValue, setInputValue] = useState<string | undefined>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    const data = {
      fromUser,
      toUser,
      sendTime,
      message: inputValue,
    };
    try {
      await sendMessage(data);
      setNewChatData([...newChatData, data]);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <span className="block text-center my-3">Chat with '{target}'</span>
      <ChatContent chatData={newChatData} fromUser={fromUser} />
      <form onSubmit={submitHandler} className="text-center">
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
      </form>
    </div>
  );
};

export default PersonalChatRoomPage;

export const getServerSideProps = async (context) => {
  const user = context.params.user.replace(".", "");
  const target = context.params?.personalChatRoom;

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/personal-chat/${user}/${target}.json`
  );
  const messages = response.data;
  const personalChatContent = [];

  // if (!messages) {
  //   return { props: { target, personalChatContent } };
  // }

  for (let key in messages) {
    personalChatContent.push(messages[key]);
  }

  return { props: { target, personalChatContent } };
};
