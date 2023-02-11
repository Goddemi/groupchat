import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setLogout } from "../../store/auth/loginUser";
import { useRouter } from "next/router";

const Nav = ({ setMenuState }: any) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = async () => {
    await router.push("/home");
    dispatch(setLogout());
  };

  return (
    <div className="flex justify-center">
      <div className="my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={"/userList"}>UserList</Link>
      </div>
      <div className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={`/personal/${loginUser}`}>1:1 Chat</Link>
      </div>
      <div className="my-2 p-3 border border-black border-solid cursor-pointer">
        <Link href={`/group/${loginUser}`}>Group Chat</Link>
      </div>
      <div className="mx-1 my-2 p-3 border border-black border-solid cursor-pointer">
        <div onClick={logOut}>Log out</div>
      </div>
    </div>
  );
};

export default Nav;
