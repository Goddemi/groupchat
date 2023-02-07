import React, { useState } from "react";
import GroupChat from "../chat/GroupChat";
import PersonalChat from "../chat/PersonalChat";
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
      <Nav setMenuState={setMenuState} />
      {menuState.userList && <UserList userArrayList={userArrayList} />}
      {menuState.personalChat && <PersonalChat />}
      {menuState.groupChat && <GroupChat />}
    </div>
  );
};

export default MainLayout;
