//방만들기, 현재 있는 방.
import axios from "axios";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import List from "../../../components/elements/List";
import { emailFormatter } from "../../../lib/emailFomatter";

const GroupChatPage = (props) => {
  const router = useRouter();
  const query = router.query.user;
  const user = emailFormatter(query as string);

  const path = router.asPath;
  const groupChatList = props.groupChatList;

  const [createdRoomId, setCreatedRoomId] = useState("");

  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCreatedRoomId(inputValue);
  };

  const goToChatRoom = (targetRoomId) => {
    router.push(`${path}/${targetRoomId}`);
  };

  const makeRoomHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { roomId: createdRoomId };
    await axios.post(
      `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${user}.json`,
      data
    );
    // router.push(`${path}/${createdRoomId}`);
  };

  return (
    <div>
      <form className="my-3 border" onSubmit={makeRoomHandler}>
        <div className="m-2 p-1 text-center ">방 만들기</div>
        <input
          className="m-2 p-1 w-3/4 bg-gray-100 "
          placeholder="방 제목 입력"
          onChange={roomIdHandler}
        />
        <button className="m-2 p-1 w-1/6 bg-gray-400">만들기</button>
      </form>
      <div className="my-7">
        <div className="my-3 text-center">방 리스트</div>
        {groupChatList?.map((targetRoomId) => {
          return (
            <div
              key={targetRoomId}
              onClick={() => {
                goToChatRoom(targetRoomId);
              }}
            >
              <List targetId={targetRoomId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupChatPage;

export const getServerSideProps = async (context) => {
  const params = context.params.user;
  const user = params.replace(".", "");

  const response = await axios(
    `https://nextron-chat-a24da-default-rtdb.asia-southeast1.firebasedatabase.app/group-chat-list/${user}.json`
  );
  const result = response.data;

  const groupChatList = [];

  for (let key in result) {
    groupChatList.push(result[key].roomId);
  }

  return { props: { groupChatList } };
};
