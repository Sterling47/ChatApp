'use client'
import { useState } from 'react';
import { RoomComponent } from './RoomComponent';

interface allRooms {
  RoomID: number
  roomName: string | undefined
  messages: {
    content: string,
    id: number,
    userID: number,
    timeStamp: Date
  }[],
  userID: number
}
export default function MultiRoomChat({ rooms }:{rooms:allRooms[]}) {
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].RoomID);

  return (
    <div className='row-start-1 row-end-13 col-start-2 col-end-10 h-full flex flex-col'>
      <div className="flex border-b overflow-x-auto">
        {rooms.map((room) => (
          <button
            key={room.RoomID}
            className={`px-4 py-2 ${
              activeRoomId === room.RoomID 
                ? 'border-b-2 border-blue-500' 
                : ''
            }`}
            onClick={() => setActiveRoomId(room.RoomID)}
          >
            {room.roomName}
          </button>
        ))}
      </div>

      <div className='flex-1 overflow-hidden'>

      {rooms.map((room) => (
        activeRoomId === room.RoomID && (
          <RoomComponent
          key={room.RoomID}
          RoomID={room.RoomID}
          initialMessages={room.messages}
          roomName={room.roomName}
          userID={room.userID}
          />
        )
      ))}
      </div>
    </div>
  );
}