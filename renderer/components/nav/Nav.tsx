import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav = ({ setMenuState }: any) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);

  return (
    <div className="flex justify-center">
      <div className="my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={"/"}>UserList</Link>
      </div>
      <div className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={`/personal/${loginUser}`}>1:1 Chat</Link>
      </div>
      <div className="my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={`/group/${loginUser}`}>Group Chat</Link>
      </div>
    </div>
  );
};

export default Nav;
