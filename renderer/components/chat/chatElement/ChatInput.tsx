const ChatInput = ({ inputValue, setInputValue }) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="my-3">
      <input
        value={inputValue}
        onChange={inputHandler}
        className="w-3/4 p-2 bg-slate-100 outline-0"
        placeholder="내용을 입력해 주세요"
      />
      <button className="w-1/4 p-2 bg-slate-400">전송</button>
    </div>
  );
};

export default ChatInput;
