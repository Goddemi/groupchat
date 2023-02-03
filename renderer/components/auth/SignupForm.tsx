import { useRef, useState } from "react";
import Notification from "../notification/Notification";
import { signupRequest } from "./api/auth";
import InputForm from "./formElement/InputForm";

interface Props {
  goToLogin: () => void;
}

const SignupForm = ({ goToLogin }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const [signupRequestResult, setSignupRequestResult] = useState();

  const signupHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordCheck = passwordCheckRef.current?.value;

    const response = await signupRequest(email, password, passwordCheck);

    setSignupRequestResult(response);

    setTimeout(() => {
      if (response === "회원가입 성공") {
        goToLogin();
      }
    }, 500);
  };

  return (
    <form>
      <InputForm label={"아이디(이메일)"} id={"email"} ref={emailRef} />
      <InputForm label={"비밀번호"} id={"password"} ref={passwordRef} />
      <InputForm
        label={"비밀번호 확인"}
        id={"password"}
        ref={passwordCheckRef}
      />

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-blue-400 mb-2 py-1 px-3 rounded-md"
          onClick={signupHandler}
        >
          회원가입
        </button>
      </div>
      {signupRequestResult && (
        <Notification id={"signup"} result={signupRequestResult} />
      )}
    </form>
  );
};

export default SignupForm;
