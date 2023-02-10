import { useState } from "react";
import List from "../elements/List";
import SearchUser from "./search/SearchUser";

interface Props {
  userArrayList: string[];
}

const UserList = ({ userArrayList }: Props) => {
  const [searchUser, setSearchUser] = useState<string | undefined>();

  if (searchUser) {
    userArrayList = userArrayList.filter((user) =>
      user.toLowerCase().includes(searchUser)
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-5 border border-black border-solid">
        <SearchUser setSearchUser={setSearchUser} />
        <ul>
          {userArrayList.map((user) => {
            return <List targetId={user} key={user} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
