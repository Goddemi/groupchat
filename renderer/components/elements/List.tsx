import Link from "next/link";
import { useSelector } from "react-redux";
import { emailFormatter } from "../../lib/emailFomatter";
import { RootState } from "../../store/store";

const List = ({ targetId }: { targetId: string }) => {
  const loginData = useSelector((state: RootState) => state.login.loginUser);
  const loginUser = loginData && emailFormatter(loginData);

  const targetUser = emailFormatter(targetId);

  const path = `/personal/${loginUser}/${targetUser}`;

  return (
    <Link href={path}>
      <li className="list-none mb-4 p-4 bg-slate-100 border cursor-pointer">
        {targetId.includes("@")
          ? `${targetId}님과 대화하기`
          : `방 제목 : ${targetId}`}
      </li>
    </Link>
  );
};

export default List;
