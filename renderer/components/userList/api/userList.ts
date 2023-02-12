import axios from "axios";
import { USERLIST_CONFIG } from "../../../config/config";

export async function getUserListWithArray() {
  try {
    const { data } = await axios(USERLIST_CONFIG);
    let userArrayList: string[] = [];
    for (let key in data) {
      userArrayList = [...userArrayList, data[key].userEmail];
    }
    return userArrayList;
  } catch (error) {
    console.error(error);
    return [];
  }
}
