import Link from "next/link";
import { useSelector } from "react-redux";
import { emailFormatter } from "../../lib/emailFomatter";
import { RootState } from "../../store/store";

const List = ({ user }: { user: string }) => {
  const loginData = useSelector((state: RootState) => state.login.loginUser);

  const loginUser = loginData && emailFormatter(loginData);
  const targetUser = emailFormatter(user);

  const path = `/personal/${loginUser}/${targetUser}`;

  return (
    <Link href={path}>
      <li className="list-none mb-4 p-4 bg-slate-100 border cursor-pointer">
        {user}님과 대화하기
      </li>
    </Link>
  );
};

export default List;
