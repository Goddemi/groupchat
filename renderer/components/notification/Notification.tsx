import { useEffect } from "react";
import { useState } from "react";
import { loginErrorHandler, signupErrorHandler } from "../auth/api/error";

interface Props {
  id: string;
  result: string;
}

const Notification = ({ id, result }: Props) => {
  const [message, setMessage] = useState<string | null>();

  const signupHandler = (result: string | undefined) => {
    if (result === "회원가입 성공") {
      setMessage(result);
    } else {
      const message = signupErrorHandler(result);
      setMessage(message);
    }
  };

  const loginHandler = (result: string | undefined) => {
    if (result === "로그인 성공") {
      setMessage(result);
    } else {
      const message = loginErrorHandler(result);
      setMessage(message);
    }
  };

  const initiation = () => {
    if (id === "signup") {
      signupHandler(result);
      return;
    }

    if (id === "login") {
      loginHandler(result);
      return;
    }
  };

  useEffect(initiation, [result]);

  return (
    <div className="text-center">
      <span className="text-center text-black">{message} </span>
    </div>
  );
};

export default Notification;
