import Link from "next/link";
import { useSelector } from "react-redux";
import { emailFormatter } from "../../lib/emailFomatter";
import { RootState } from "../../store/store";

const List = ({ targetId }: { targetId: string }) => {
  const loginUser = useSelector((state: RootState) => state.login.loginUser);
  const target = emailFormatter(targetId);

  //개인대화일 경우
  if (targetId.includes("@")) {
    const path = `/personal/${loginUser}/${target}`;

    return (
      <Link href={path}>
        <li className="list-none mb-4 p-4 bg-slate-100 border cursor-pointer">
          {`${target}님과 대화하기`}
        </li>
      </Link>
    );
  }

  //그룹대화일 경우
  const path = `/group/${loginUser}/${target}`;

  return (
    <Link href={path}>
      <li className="list-none mb-4 p-4 bg-slate-100 border cursor-pointer">
        {`방 제목 : ${target}`}
      </li>
    </Link>
  );
};

export default List;
