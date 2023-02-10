import List from "../../../components/elements/List";

interface Props {
  goToChatRoom: (targetRoomId: string) => void;
  groupChatList: string[];
}

const GroupRoomList = ({ goToChatRoom, groupChatList }: Props) => {
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
