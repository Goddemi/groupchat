import { useState } from "react";
import { emailFormatter } from "../../../../lib/emailFomatter";
import { getUserListWithArray } from "../../../userList/api/userList";
import {
  postGroupChatRoomToInvitedPerson,
  postMemberListToRoomDatabase,
} from "./api";
import { MemberType } from "../../../../type/chat";
interface Props {
  roomId: string;
  members: MemberType[];
}

const InviteForm = ({ roomId, members }: Props) => {
  const [invitePersonId, setInvitePersonId] = useState<string>("");
  const [newMembers, setNewMembers] = useState(members);

  const inviteInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInvitePersonId(inputValue);
  };

  const inviteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const memberList = members.map((ele) => Object.values(ele)[0]);
    const formattedId = emailFormatter(invitePersonId);

    if (memberList.includes(formattedId)) {
      alert("중복 아이디 불가");
      return;
    }

    const userList = await getUserListWithArray();
    if (!userList.includes(invitePersonId)) {
      alert("등록되지 않은 유저입니다.");
      return;
    }

    const key = new Date().getTime();

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
