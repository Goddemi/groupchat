import { getUserListWithArray } from "../../components/userList/api/userList";
import { postUserList } from "../../components/auth/api/userList";
import { USERLIST_CONFIG } from "../../config/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const userEmail = req.body.userEmail;
      const result = await postUserList(USERLIST_CONFIG, userEmail);
      res.send("add user list success");
    } catch (error) {
      res.send("can't add user list");
    }
  }
}
