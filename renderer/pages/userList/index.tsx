import { useState } from "react";
import { useSelector } from "react-redux";
import List from "../../components/elements/List";
import SearchUser from "../../components/userList/search/SearchUser";
import { getUserListWithArray } from "../../components/userList/api/userList";
import { RootState } from "../../store/store";

interface Props {
  userArrayList: string[];
}

const UserListPage = ({ userArrayList }: Props) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const userListExceptMe = userArrayList.filter((ele) => ele !== loginUser);

  let filteredList = userListExceptMe;

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
          {filteredList.map((user) => {
            return <List targetId={user} key={user} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserListPage;

export async function getServerSideProps() {
  const data = await getUserListWithArray();

  return { props: { userArrayList: data } };
}
