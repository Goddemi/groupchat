import { useState } from "react";
import { pushData } from "../../../lib/firebaseLib";
import ChatInput from "./ChatInput";

interface Props {
  roomId: string;
  fromUser: string;
  toUser?: string | null;
}

const ChatForm = ({ roomId, fromUser, toUser = "" }: Props) => {
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
        await pushData(`group-chat/${roomId}/messages`, data);
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
