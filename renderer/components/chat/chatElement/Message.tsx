const Message = ({ data }) => {
  const { message, sendTime } = data;

  const originDate = new Date(sendTime);
  const date = originDate.toLocaleDateString();
  const time = originDate.toLocaleTimeString();
  return (
    <li
      className={`w-fit flex flex-col bg-white text-black p-3 m-3 rounded-md`}
    >
      <span className="inline-block mb-2">{message}</span>

      <span className="text-xs">
        {date} {time}
      </span>
    </li>
  );
};

export default Message;
