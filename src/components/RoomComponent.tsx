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
    timeStamp: Date
  }[],
  userID: number
}

export const RoomComponent:React.FC<RoomComponentProps> = ({RoomID,roomName,initialMessages,userID}) => {
  return (
    <>
      <div>
        <h2 className='py-6 text-center text-2xl'>{roomName}</h2>
        </div>
        <Messages initialMessages={initialMessages} RoomID={RoomID} creatorID={userID}/>
        <div className="flex justify-center items-center h-[8%] w-full bg-primary">
          <SendMessage RoomID={RoomID} userID={userID} />
        </div>
    </>

   
  )
}
