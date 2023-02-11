import { getUserListWithArray } from "../../components/userList/api/userList";
import { postUserList } from "../../components/auth/api/userList";
import { USER_CONFIG } from "../../config/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const userEmail = req.body.userEmail;
      const result = await postUserList(USER_CONFIG, userEmail);
      res.send("add user list success");
    } catch (error) {
      res.send("can't add user list");
    }
  }

  if (req.method === "GET") {
    try {
      const userList = await getUserListWithArray();
      res.send(userList);
    } catch (error) {
      res.send("can't get user list");
    }
  }
}
