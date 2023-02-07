const List = ({ user }: { user: string }) => {
  return (
    <li className="list-none mb-4 p-4 bg-slate-100 border cursor-pointer">
      {user}님과 대화하기
    </li>
  );
};

export default List;
