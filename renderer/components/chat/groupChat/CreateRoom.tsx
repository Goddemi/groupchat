import { useState } from "react";
import axios from "axios";
import { emailFormatter } from "../../../lib/emailFomatter";
import { addChatListToUser, makeNewChatRoom } from "../api/firebaseApi";

interface Props {
  goToChatRoom: (targetRoomId: string) => void;
  userWithDot: string;
}
const CreateRoom = ({ goToChatRoom, userWithDot }: Props) => {
  const [createdRoomId, setCreatedRoomId] = useState("");
  const user = emailFormatter(userWithDot as string);

  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCreatedRoomId(inputValue);
  };

  const makeRoomHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!createdRoomId) {
      alert("방 제목을 입력해주세요");
      return;
    }

    const existedNameCheckResult = await roomIdExistedCheckHandler();

    if (!existedNameCheckResult) {
      const data = { roomId: createdRoomId };
      const content = { host: user };
      await makeNewChatRoom(`group-chat/${createdRoomId}/members`, content);
      await addChatListToUser(`group-chat-list/${user}`, data);
      goToChatRoom(createdRoomId);
    }

    return;
  };

  const roomIdExistedCheckHandler = async () => {
    const getResult = await axios(
      `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${user}.json`
    );
    const existedData = getResult.data;

    for (let key in existedData) {
      if (existedData[key].roomId === createdRoomId) {
        alert("동일한 방 이름이 있습니다.");
        return true;
      }
    }
    return false;
  };

  return (
    <>
      {" "}
      <form className="my-3 border" onSubmit={makeRoomHandler}>
        <div className="m-2 p-1 text-center ">방 만들기</div>
        <input
          className="m-2 p-1 w-3/4 bg-gray-100 "
          placeholder="방 제목 입력"
          onChange={roomIdHandler}
        />
        <button className="m-2 p-1 w-1/6 bg-gray-400">만들기</button>
      </form>
    </>
  );
};

export default CreateRoom;
