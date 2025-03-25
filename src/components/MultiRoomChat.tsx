'use client'
import { RoomComponent } from '@/components/RoomComponent';
import UserSearch from './UserSearch';
import { useActiveRoom } from '@/app/contexts/ActiveRoomContext';
import { RoomTabs } from '@/components/RoomTabs';
import { RoomTab } from '@/lib/types';

const MultiRoomChat = ({ rooms }: { rooms: RoomTab[] }) => {
  const { activeRoomId } = useActiveRoom();

  return (
    <div className="row-start-3 row-end-13 col-start-1 col-end-10 lg:row-start-1 lg:row-end-13 lg:col-start-3 h-full flex flex-col bg-[#1e1e1e] p-1">
      <RoomTabs rooms={rooms} />
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