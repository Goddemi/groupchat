import List from "../../../components/elements/List";

const GroupRoomList = ({ goToChatRoom, groupChatList }) => {
  return (
    <div className="my-7">
      <div className="my-3 text-center">대화중인 방 리스트</div>
      {groupChatList?.map((targetRoomId) => {
        return (
          <div
            key={targetRoomId}
            onClick={() => {
              goToChatRoom(targetRoomId);
            }}
          >
            <List targetId={targetRoomId} />
          </div>
        );
      })}
    </div>
  );
};

export default GroupRoomList;
