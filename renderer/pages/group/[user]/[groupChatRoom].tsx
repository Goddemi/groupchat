import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { sendMessage } from "../../../components/chat/api/sendMessage";
import ChatContent from "../../../components/chat/chatElement/ChatContent";
import ChatInput from "../../../components/chat/chatElement/ChatInput";
import { RootState } from "../../../store/store";
import { GetServerSideProps } from "next";
import { emailFormatter } from "../../../lib/emailFomatter";
import InviteForm from "../../../components/chat/groupChat/invite/InviteForm";
import ChatForm from "../../../components/chat/chatElement/ChatForm";

const GroupChatRoomPage = (props) => {
  const { fromUser, roomId, members, messages } = props;

  return (
    <div>
      <span className="block text-center my-3">Chat in '{roomId}'</span>
      <InviteForm roomId={roomId} members={members} />
      <ChatContent roomId={roomId} chatData={messages} fromUser={fromUser} />
      <ChatForm roomId={roomId} fromUser={fromUser} />
    </div>
  );
};

export default GroupChatRoomPage;

export const getServerSideProps = async (context) => {
  const user = context.params.user.replace(".", "");
  const roomId = context.params.groupChatRoom;

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}.json`
  );

  const roomData = response.data;

  const [members, messages] = [[], []];

  for (let key in roomData.members) {
    members.push(roomData.members[key]);
  }

  for (let key in roomData.messages) {
    messages.push(roomData.messages[key]);
  }

  return { props: { fromUser: user, roomId, members, messages } };
};
