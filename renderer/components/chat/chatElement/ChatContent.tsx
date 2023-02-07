import Message from "./Message";

const ChatContent = ({ chatData, target }) => {
  return (
    <>
      <ul className=" h-screen bg-gray-200 p-3">
        {chatData.map((data) => {
          return (
            <div
              className={`flex ${
                target !== data.fromUser ? `justify-end` : ``
              }`}
            >
              <Message data={data} target={target} />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default ChatContent;
