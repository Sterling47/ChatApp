'use client'
import SendMessage from '@/components/SendMessage';
import { Messages } from '@/components/Messages';

interface RoomComponentProps {
  RoomID: number
  roomName: string | undefined
  initialMessages: {
    content: string,
    id: number,
    userID: number,
    timeStamp: Date,
    username: string
  }[],
  userID: number
}

export const RoomComponent:React.FC<RoomComponentProps> = ({RoomID,initialMessages,userID}) => {
  return (
    <>
        <Messages initialMessages={initialMessages} RoomID={RoomID} creatorID={userID}/>
        <div className="flex justify-center items-center h-[8%] w-full ">
          <SendMessage RoomID={RoomID} userID={userID} />
        </div>
    </>
  )
}
