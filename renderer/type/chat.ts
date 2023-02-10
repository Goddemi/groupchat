export interface RoomDataType {
  members: { [key: string]: MemberType };
  messages: { [key: string]: MessageType };
}

export interface MemberType {
  [key: string]: string;
}

export interface MessageType {
  fromUser: string;
  message: string;
  sendTime: number;
  toUser?: string | undefined;
}
