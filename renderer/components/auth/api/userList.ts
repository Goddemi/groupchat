import axios from "axios";

export const addUserList = (url: string, userEmail: string) => {
  axios.post(url, {
    userEmail,
  });
};

export const getUserList = (url: string) => {
  const result = axios(url);
  console.log(result);
  return result;
};
