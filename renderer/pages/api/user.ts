import { getUserList } from "./../../components/auth/api/userList";
import type { NextApiRequest, NextApiResponse } from "next";
import { addUserList } from "../../components/auth/api/userList";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userConfig =
    "https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/user.json";

  if (req.method === "POST") {
    try {
      const userEmail = req.body.userEmail;
      const result = await addUserList(userConfig, userEmail);
      res.send("add user list success");
    } catch (error) {
      res.send("can't add user list");
    }
  }

  if (req.method === "GET") {
    try {
      const userList = await getUserList(userConfig);
      res.send(userList);
    } catch (error) {
      res.send("can't get user list");
    }
  }
}
