import { useState } from "react";
import ChatInput from "./ChatInput";
import { pushData } from "../api/firebaseApi";

const ChatForm = ({ roomId, fromUser, toUser = "" }) => {
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
      if (toUser) {
        await pushData(`personal-chat/${roomId}`, data);
      } else {
        await pushData(`group-chat/${roomId}`, data);
      }
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="text-center">
      <ChatInput inputValue={inputValue} setInputValue={setInputValue} />
    </form>
  );
};

export default ChatForm;
