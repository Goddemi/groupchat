import react, { useEffect, useState } from "react";
import Message from "./Message";
import { db } from "../../../firebase";
import { ref } from "firebase/database";
import { getLiveData } from "../../../lib/firebaseLib";
import { MessageType } from "../../../type/chat";
interface Props {
  roomId: string;
  fromUser: string;
  chatData: MessageType[];
}

const ChatContent = ({ roomId, fromUser, chatData }: Props) => {
  const [newChatData, setNewChatData] = useState(chatData);

  if (roomId.includes("@")) {
    const messagesRef = ref(db, `personal-chat/${roomId}`);

    useEffect(() => {
      getLiveData(messagesRef, setNewChatData);
    }, []);
  } else {
    const messagesRef = ref(db, `group-chat/${roomId}/messages`);

    useEffect(() => {
      getLiveData(messagesRef, setNewChatData);
    }, []);
  }

  return (
    <>
      <ul className="h-screen bg-gray-200 p-3 overflow-auto">
        {newChatData.map((data) => {
          return (
            <div
              className={` flex ${
                fromUser === data.fromUser ? `justify-end` : ``
              }`}
              key={data.sendTime}
            >
              <Message data={data} />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default ChatContent;
