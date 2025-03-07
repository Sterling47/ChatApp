'use client'
import { RoomComponent } from '@/components/RoomComponent';
import UserSearch from './UserSearch';
import { useActiveRoom } from '@/app/contexts/ActiveRoomContext';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface RoomTab {
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

const MultiRoomChat = ({ rooms }: { rooms: RoomTab[] }) => {
  const { activeRoomId, setActiveRoomId, openRooms, setOpenRooms } = useActiveRoom();
  const router = useRouter();
  const handleCloseTab = (roomId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedRooms = openRooms.filter(id => id !== roomId)
    if (activeRoomId === roomId) {
      const closedRoomIndex = openRooms.indexOf(roomId);
      const newActiveId =
        updatedRooms[closedRoomIndex - 1] ??
        updatedRooms[closedRoomIndex] ??
        'search';
      setActiveRoomId(newActiveId);
    }
    setOpenRooms(updatedRooms)
    if (updatedRooms.length === 0) {
      router.push('/Home/SearchUser');
    } else {
      router.push(`/Home/${updatedRooms.join('/')}`);
    }
  };

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
              className={`group px-12 py-3 text-sm font-medium relative
                ${activeRoomId === room.RoomID
                  ? 'opacity-100'
                  : 'opacity-70 hover:opacity-100'
                } transition-all duration-200`}
            >
              {room.roomName}
              <span
                  onClick={(e) => handleCloseTab(room.RoomID, e)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Close ${room.roomName} tab`}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2
                    opacity-0 group-hover:opacity-100 
                    flex items-center justify-center
                    w-6 h-6 rounded-full 
                    bg-gray-700/50 text-white hover:bg-gray-600/50 
                    focus:outline-none focus:ring-2 focus:ring-white/75
                    transition-opacity duration-200
                    cursor-pointer select-none"
                >
                  <X className="w-4 h-4" />
                </span>
            </button>

          </div>
        ))}
      </div>

      <div
        className={`flex-1 overflow-hidden -mt-[1px] relative z-0
          bg-[#292929] border border-white border-x-0 border-b-0 rounded-none
          transition-colors duration-200 p-4`}
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