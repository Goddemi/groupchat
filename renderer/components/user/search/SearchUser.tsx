interface Props {
  setSearchUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SearchUser = ({ setSearchUser }: Props) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value;
    setSearchUser(inputData);
  };
  return (
    <div>
      {" "}
      <input
        className="w-full h-8 mb-5 p-1 bg-slate-200 border rounded-md"
        onChange={searchHandler}
        placeholder="user 검색하기"
      />
    </div>
  );
};

export default SearchUser;
