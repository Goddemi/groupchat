import { app } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    const result = { message: "빈칸을 입력해 주세요" };
    return result;
  }

  if (email && password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      //사용자 정보 확인, 이름이나 이메일 이메일을 아이디로 쓰면 될듯. 채팅방에서
      const result = { message: "로그인 성공" };
      return result;
    } catch (error: any) {
      const result = { message: error.code };
      return result;
    }
  }
};
