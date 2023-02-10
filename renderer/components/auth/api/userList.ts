import axios from "axios";
import { USER_CONFIG } from "../../../config/config";

//component에서 api Route 이용
//checkthis
export const postUserList = (url: string, userEmail: string) => {
  axios.post(url, {
    userEmail,
  });
};
