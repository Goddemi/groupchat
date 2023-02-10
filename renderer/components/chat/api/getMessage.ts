import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase";

export const getMessage = (fromUser, toUser, newChatData, setNewChatData) => {
  // 채팅 대상이 있을 경우 1:1채팅
  // // if (toUser) {
  // //   const url = `/personal-chat/${fromUser}/${toUser}`;
  // //   try {
  // //     const personalChatRef = ref(db, url);
  // //     onValue(personalChatRef, (snapshot) => {
  // //       const data = snapshot.val();
  // //       //새로들어온 데이터가 data로 꽂혀!
  // //       //
  // //       // setNewChatData([...newChatData, data]);
  // //       console.log(data);
  // //     });
  // //   } catch (error) {
  // //     console.log(error);
  // //   }
  // //   return;
  // }
  // 채팅 대상이 없을 경우 그룹채팅
  //   const { roomId } = data;
  //   const url = `/group-chat/${roomId}/messages`;
  //   try {
  //     axios.post(url, data);
  //   } catch (error) {
  //     console.log(error);
  //   }
};
