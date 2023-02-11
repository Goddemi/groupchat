import axios from "axios";

//component에서 api Route 이용
export const postUserList = (url: string, userEmail: string) => {
  axios.post(url, {
    userEmail,
  });
};
