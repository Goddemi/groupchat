import { useState } from "react";
import { getUserList } from "../auth/api/userList";

interface Props {
  userArrayList: string[];
}

const UserList = ({ userArrayList }: Props) => {
  const [searchUser, setSearchUser] = useState<string | undefined>();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setSearchUser(inputData);
  };

  if (searchUser) {
    userArrayList = userArrayList.filter((ele) =>
      ele.toLowerCase().includes(searchUser)
    );
  }

  return (
    <div className="p-3 border border-black border-solid">
      <input
        className="w-full h-8 mb-5 p-1 bg-slate-200 border rounded-md"
        onChange={searchHandler}
        placeholder="user 검색하기"
      />

      <ul>
        {userArrayList.map((ele) => {
          return (
            <li className="mb-4 p-4 bg-slate-100 border cursor-pointer">
              {ele}님과 대화하기
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
