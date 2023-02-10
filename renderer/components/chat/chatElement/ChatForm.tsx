import { useState } from "react";
import ChatInput from "./ChatInput";
import { uuidv4 } from "@firebase/util";
import { setData } from "../api/firebaseApi";

const ChatForm = ({ roomId, fromUser, toUser }) => {
  const sendTime = new Date().getTime();
  const [inputValue, setInputValue] = useState<string | undefined>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    const key = uuidv4();

    const data = {
      [key]: {
        fromUser,
        toUser,
        sendTime,
        message: inputValue,
      },
    };
    try {
      await setData(`personal-chat/${roomId}`, data);
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
