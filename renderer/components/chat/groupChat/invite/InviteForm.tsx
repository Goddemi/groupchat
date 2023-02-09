import { useState } from "react";
import { emailFormatter } from "../../../../lib/emailFomatter";
import { getUserListWithArray } from "../../../auth/api/userList";
import {
  postGroupChatRoomToInvitedPerson,
  postMemberListToRoomDatabase,
} from "./api";

const InviteForm = ({ roomId, members }) => {
  const [invitePersonId, setInvitePersonId] = useState<string | undefined>("");
  const [newMembers, setNewMembers] = useState(members);

  const inviteInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInvitePersonId(inputValue);
  };

  const inviteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (members.includes(invitePersonId)) {
      alert("중복 아이디 불가");
      return;
    }

    const userList = await getUserListWithArray();
    if (!userList.includes(invitePersonId)) {
      alert("등록되지 않은 유저입니다.");
      return;
    }

    const key = new Date().getTime();
    const formattedId = emailFormatter(invitePersonId);
    const data = { [key]: formattedId };

    postMemberListToRoomDatabase(roomId, data);
    postGroupChatRoomToInvitedPerson(roomId, formattedId);

    setNewMembers([...newMembers, data]);
    setInvitePersonId("");
  };

  return (
    <>
      {" "}
      <div className="my-3 p-2 border">
        <span>대화중인 사람</span>
        <ul>
          {newMembers.map((ele) => {
            const key = Object.keys(ele)[0];
            const memberId = ele[key];
            return (
              <span key={memberId} className="block m-1 text-sm">
                {key === "host"
                  ? `${key} : ${memberId}`
                  : `guest : ${memberId}`}
              </span>
            );
          })}
        </ul>
        <form onSubmit={inviteHandler}>
          <input
            className="mx-1 bg-gray-100 rounded-md"
            onChange={inviteInputHandler}
            value={invitePersonId}
          />
          <button className="mx-2">초대하기</button>
        </form>
      </div>
    </>
  );
};

export default InviteForm;
