import React, { useState } from "react";
import Nav from "../nav/Nav";
import UserList from "../user/UserList";

interface Props {
  userArrayList: string[];
}

const MainLayout = ({ userArrayList }: Props) => {
  const [menuState, setMenuState] = useState({
    userList: true,
    personalChat: false,
    groupChat: false,
  });
  return (
    <div>
      <Nav />
      {menuState.userList && <UserList userArrayList={userArrayList} />}
      {/* {menuState.userList && <UserList />} */}
      {/* {menuState.userList && <UserList />} */}
    </div>
  );
};

export default MainLayout;
