import { useState } from "react";
import List from "../elements/List";
import SearchUser from "./search/SearchUser";

interface Props {
  userArrayList: string[];
}

const UserList = ({ userArrayList }: Props) => {
  const [searchUser, setSearchUser] = useState<string | undefined>();

  if (searchUser) {
    userArrayList = userArrayList.filter((ele) =>
      ele.toLowerCase().includes(searchUser)
    );
  }

  return (
    <div className="p-3 border border-black border-solid">
      <SearchUser setSearchUser={setSearchUser} />
      <ul>
        {userArrayList.map((user) => {
          return <List targetId={user} key={user} />;
        })}
      </ul>
    </div>
  );
};

export default UserList;
