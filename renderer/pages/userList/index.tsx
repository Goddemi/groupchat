import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "../../components/elements/List";
import SearchUser from "../../components/userList/search/SearchUser";
import { getUserListWithArray } from "../../components/userList/api/userList";
import { RootState } from "../../store/store";

const UserListPage = () => {
  const [userList, setUserList] = useState<string[] | undefined>([]);

  const getUserListHandler = async () => {
    const response = await getUserListWithArray();
    setUserList(response);
  };

  useEffect(() => {
    getUserListHandler();
  }, []);

  if (!userList) {
    return <div>로딩 중</div>;
  }

  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const userListExceptMe = userList.filter((user) => user !== loginUser);

  let filteredList: string[] = userListExceptMe;

  const [searchUser, setSearchUser] = useState<string | undefined>();

  if (searchUser) {
    filteredList = userListExceptMe.filter((user) =>
      user.toLowerCase().includes(searchUser)
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-5 border border-black border-solid">
        <SearchUser setSearchUser={setSearchUser} />
        <ul>
          {filteredList?.map((user) => {
            return <List targetId={user} key={user} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserListPage;
