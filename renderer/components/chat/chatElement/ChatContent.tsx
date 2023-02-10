import react, { useEffect, useState } from "react";

import Message from "./Message";
import { db } from "../../../firebase";
import { ref } from "firebase/database";
import { getDataLive } from "../api/firebaseApi";

const ChatContent = ({ roomId, chatData, fromUser }) => {
  const [newChatData, setNewChatData] = useState(chatData);

  const messagesRef = ref(db, `personal-chat/${roomId}`);

  useEffect(() => {
    getDataLive(messagesRef, setNewChatData);
  }, []);

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
