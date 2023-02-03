import { useState } from "react";
import GoBackButton from "./formElement/GoBackButton";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = ({ setLoginState }: any) => {
  const [formChanger, setFormChanger] = useState({
    loginForm: true,
    signupForm: false,
  });

  const { loginForm, signupForm } = formChanger;

  const goToLogin = () => {
    setFormChanger({
      loginForm: true,
      signupForm: false,
    });
  };

  const goToSignup = () => {
    setFormChanger({
      loginForm: false,
      signupForm: true,
    });
  };

  return (
    <div className="relative p-11 bg-white text-black">
      <div>{loginForm || <GoBackButton goToLogin={goToLogin} />}</div>
      <div className="">
        {loginForm && (
          <LoginForm goToSignup={goToSignup} setLoginState={setLoginState} />
        )}
        {signupForm && <SignupForm goToLogin={goToLogin} />}
      </div>
    </div>
  );
};

export default AuthForm;
