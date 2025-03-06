import { create } from 'zustand';

interface incomingMessageProps {
  content: string,
  userID: number | undefined,
  roomID: number | undefined,
  timeStamp: Date,
  id: number,
  username: string
}
type MessageStore = {
  messages: Record<string, incomingMessageProps[]>; 
  addMessage: (roomID: number, message: incomingMessageProps) => void;

};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: {},
  addMessage: (roomID, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [roomID]: [...(state.messages[roomID] || []), message],
      },
    })),

}));