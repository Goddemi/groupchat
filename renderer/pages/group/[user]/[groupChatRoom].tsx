import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { sendMessage } from "../../../components/chat/api/sendMessage";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatInput from "../../../components/chat/chatElement/ChatInput";
import { RootState } from "../../../store/store";
import { GetServerSideProps } from "next";
import { emailFormatter } from "../../../lib/emailFomatter";
import InviteForm from "../../../components/chat/groupChat/InviteForm";

const GroupChatRoomPage = (props) => {
  const { roomId, members, messages } = props;
  const [newChatData, setNewChatData] = useState(messages);

  const user = useSelector((state: RootState) => state.login.loginUser);
  const fromUser = emailFormatter(user);

  const sendTime = new Date().getTime();

  const [inputValue, setInputValue] = useState<string | undefined>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    const data = {
      fromUser,
      roomId,
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
      <span className="block text-center my-3">Chat in '{roomId}'</span>

      <InviteForm roomId={roomId} members={members} />

      <ChatContent chatData={newChatData} fromUser={fromUser} />
      <form onSubmit={submitHandler} className="text-center">
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
      </form>
    </div>
  );
};

export default GroupChatRoomPage;

export const getServerSideProps = async (context) => {
  const roomId = context.params.groupChatRoom;

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}.json`
  );

  const roomData = response.data;

  // const key = Object.keys(roomData)[0];
  // const groupChatContent = roomData[key];

  const [members, messages] = [[], []];

  for (let key in roomData.members) {
    members.push(roomData.members[key]);
  }

  for (let key in roomData.messages) {
    members.push(roomData.messages[key]);
  }

  return { props: { roomId, members, messages } };
};

//저쪽에서 보낸건 실시간으로 어떻게 확인하지.
//getData가 바뀔때마다 다시 요청하게 한다.
