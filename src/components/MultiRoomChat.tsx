'use client'
import  {RoomComponent } from '@/components/RoomComponent';
import UserSearch from './UserSearch';
import { useActiveRoom } from '@/app/contexts/ActiveRoomContext';

interface RoomTab {
  RoomID: number;
  roomName: string;
  messages: {
    content: string;
    id: number;
    userID: number;
    timeStamp: Date;
  }[];
  userID: number;
}


const MultiRoomChat = ({ rooms }: { rooms: RoomTab[] }) => {
  const { activeRoomId, setActiveRoomId } = useActiveRoom();
  
  return (
    <div className="row-start-1 row-end-13 col-start-2 col-end-10 h-full flex flex-col">
      <div className="flex bg-[#1e1e1e] text-white overflow-x-auto">
        <button
          key="search"
          className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ease-in-out
            ${activeRoomId === 'search' 
              ? 'bg-[#292929] text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#292929]'
            }`}
          onClick={() => setActiveRoomId('search')}
        >
          Search
        </button>
        {rooms.map((room) => (
          <button
            key={room.RoomID}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ease-in-out
              ${activeRoomId === room.RoomID 
                ? 'bg-[#292929] text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#292929]'
              }`}
            onClick={() => setActiveRoomId(room.RoomID)}
          >
            {room.roomName}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-hidden bg-[#292929]">
        {activeRoomId === 'search' ? (
          <UserSearch />
        ) : (
          rooms.map((room) => (
            activeRoomId === room.RoomID && (
              <RoomComponent
                key={room.RoomID}
                RoomID={room.RoomID}
                userID={room.userID}
                roomName={room.roomName}
                initialMessages={room.messages}
              />
            )
          ))
        )}
      </div>
    </div>
  );
};

export default MultiRoomChat;