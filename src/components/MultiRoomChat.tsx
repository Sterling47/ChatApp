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
    <div className="row-start-1 row-end-13 col-start-2 col-end-10 h-full flex flex-col bg-[#1e1e1e] p-1">
      <div className="flex relative bg-[#1e1e1e] text-white rounded-lg shadow-md">
        <div
          key="search"
          className={`relative transition-colors duration-200 rounded-t-lg
            ${activeRoomId === 'search' 
              ? 'bg-[#292929] border-t border-l border-r border-white z-10' 
              : 'bg-[#1e1e1e] hover:bg-[#292929]'
            }`}
        >
          <button
            onClick={() => setActiveRoomId('search')}
            className={`px-6 py-3 text-sm font-medium relative
              ${activeRoomId === 'search' 
                ? 'opacity-100' 
                : 'opacity-70 hover:opacity-100'
              } transition-all duration-200`}
          >
            Search User
          </button>
          {activeRoomId === 'search' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent"></div>
          )}
        </div>

        {/* Room Tabs */}
        {rooms.map((room, index) => (
          <div
            key={room.RoomID}
            className={`relative transition-colors duration-200 rounded-t-lg
              ${activeRoomId === room.RoomID 
                ? 'bg-[#292929] border-t border-l border-r border-white z-10' 
                : 'bg-[#1e1e1e] hover:bg-[#292929]'
              }
              ${index > 0 ? '-ml-px' : ''}`}
          >
            <button
              onClick={() => setActiveRoomId(room.RoomID)}
              className={`px-12 py-3 text-sm font-medium relative
                ${activeRoomId === room.RoomID 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-100'
                } transition-all duration-200`}
            >
              {room.roomName}
            </button>
          </div>
        ))}
      </div>

      <div 
        className={`flex-1 overflow-hidden -mt-[1px] relative z-0
          bg-[#292929] border border-white rounded-none
          transition-colors duration-200`}
      >
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