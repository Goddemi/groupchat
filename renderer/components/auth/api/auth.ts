import { app } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const auth = getAuth(app);

export const signupRequest = async (
  email: string,
  password: string,
  passwordCheck: string
) => {
  if (password !== passwordCheck) {
    return "password check error";
  }

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
};

export const loginRequest = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = user;
    const result = { uid, message: "로그인 성공" };
    return result;
  } catch (error: any) {
    const result = { uid: null, message: error.code };
    return result;
  }
};
