import axios from "axios";
import { useState } from "react";
import { emailFormatter } from "../../../lib/emailFomatter";

const InviteForm = ({ roomId, members }) => {
  const [invitePersonId, setInvitePersonId] = useState<string | undefined>();
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

    const key = new Date().getTime();
    const formattedId = emailFormatter(invitePersonId);
    const data = { [key]: formattedId };
    axios.post(
      `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat/${roomId}/members.json`,
      data
    );
    axios.post(
      `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${formattedId}.json`,
      { roomId }
    );
    setNewMembers([...newMembers, data]);
  };

  return (
    <>
      {" "}
      <div className="my-3 p-2 border">
        <span>대화중인 사람</span>
        <ul>
          {newMembers.map((ele) => {
            const key = Object.keys(ele)[0];
            return (
              <span className="block m-1 text-sm">
                {key === "host"
                  ? `${key} : ${ele[key]}`
                  : `guest : ${ele[key]}`}
              </span>
            );
          })}
        </ul>
      </div>
      <form onSubmit={inviteHandler}>
        <input
          className="mx-1 bg-gray-100 rounded-md"
          onChange={inviteInputHandler}
        />
        <button className="mx-2">초대하기</button>
      </form>
    </>
  );
};

export default InviteForm;
