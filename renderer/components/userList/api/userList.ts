import axios from "axios";
import { USER_CONFIG } from "../../../config/config";

export const getUserListWithArray = async () => {
  const { data } = await axios(USER_CONFIG);

  let userArrayList: string[] = [];

  for (let key in data) {
    userArrayList = [...userArrayList, data[key].userEmail];
  }

  return userArrayList;
};
