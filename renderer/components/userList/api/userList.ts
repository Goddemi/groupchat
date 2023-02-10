import axios from "axios";
import { USER_CONFIG } from "../../../config/config";

export const getUserListWithArray = async () => {
  const response = await axios(USER_CONFIG);
  const data = response.data;

  let userArrayList: string[] = [];

  for (let key in data) {
    userArrayList = [...userArrayList, data[key].userEmail];
  }

  return userArrayList;
};
