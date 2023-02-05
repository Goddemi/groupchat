import { app } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addUserList } from "./userList";

export const auth = getAuth(app);

type AuthInputType = string | undefined;

export const signupRequest = async (
  email: AuthInputType,
  password: AuthInputType,
  passwordCheck: AuthInputType
) => {
  if (password !== passwordCheck) {
    return "password check error";
  }

  if (!email || !password) {
    return "빈칸을 입력해 주세요";
  }

  if (email && password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      addUserList("/api/user", email);

      return "회원가입 성공";
    } catch (error: any) {
      const errorCode = await error.code;
      return errorCode;
    }
  }
};

export const loginRequest = async (
  email: AuthInputType,
  password: AuthInputType
) => {
  if (!email || !password) {
    const result = { userEmail: "", message: "빈칸을 입력해 주세요" };
    return result;
  }

  if (email && password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const result = { userEmail: user.email, message: "로그인 성공" };
      return result;
    } catch (error: any) {
      const result = { userEmail: "", message: error.code };
      return result;
    }
  }
};
