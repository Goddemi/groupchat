import axios from "axios";
import { USER_CONFIG } from "../../../config/config";

//component에서 api Route 이용
export const postUserList = (url: string, userEmail: string) => {
  axios.post(url, {
    userEmail,
  });
};

//page에서 getServerSideProps 이용
export const getUserListWithArray = async () => {
  const response = await axios(USER_CONFIG);
  const data = response.data;

  let userArrayList: string[] = [];

  for (let key in data) {
    userArrayList = [...userArrayList, data[key].userEmail];
  }

  return userArrayList;
};
