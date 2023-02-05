const Nav = ({ setMenuState }: any) => {
  const gotoUserList = () => {
    setMenuState({ userList: true, personalChat: false, groupChat: false });
  };

  const gotoPersonalChat = () => {
    setMenuState({ userList: false, personalChat: true, groupChat: false });
  };

  const gotoGroupChat = () => {
    setMenuState({ userList: false, personalChat: false, groupChat: true });
  };

  return (
    <div className="flex">
      <div
        className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer"
        onClick={gotoUserList}
      >
        UserList
      </div>
      <div
        className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer"
        onClick={gotoPersonalChat}
      >
        1:1 Chat
      </div>
      <div
        className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer"
        onClick={gotoGroupChat}
      >
        Group Chat
      </div>
    </div>
  );
};

export default Nav;
