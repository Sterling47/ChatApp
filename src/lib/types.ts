export interface RoomTab {
  RoomID: number;
  roomName: string;
  messages: {
    content: string;
    id: number;
    userID: number;
    timeStamp: Date;
    username: string;
  }[];
  userID: number;
}