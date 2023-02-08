import Message from "./Message";

const ChatContent = ({ chatData, fromUser }) => {
  return (
    <>
      <ul className=" h-screen bg-gray-200 p-3">
        {chatData.map((data) => {
          return (
            <div
              className={`flex ${
                fromUser === data.fromUser ? `justify-end` : ``
              }`}
              key={data.sendTime}
            >
              <Message data={data} />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default ChatContent;
