import { useState } from "react";
import { getUserList } from "../auth/api/userList";
import List from "../list/List";

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
        {userArrayList.map((user) => {
          return <List user={user} />;
        })}
      </ul>
    </div>
  );
};

export default UserList;
