import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
// import { getDataLive } from "../api/firebaseApi";
import { getMessage } from "../api/getMessage";
import Message from "./Message";
import { db } from "../../../firebase";
import { getDataLive } from "../api/firebaseApi";

const ChatContent = ({ roomId, chatData, fromUser, toUser }) => {
  const [newChatData, setNewChatData] = useState(chatData);

  //object. valuse...
  const messagesRef = ref(db, `personal-chat/${roomId}`);
  useEffect(() => {
    getDataLive(messagesRef, setNewChatData);

    // onValue(messagesRef, (snapshot) => {
    //   const messagesData = snapshot.val();
    //   const newMessage = Object.values(messagesData);
    //   setNewChatData((prevMessages) => [...prevMessages, ...newMessage]);
    // });
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
