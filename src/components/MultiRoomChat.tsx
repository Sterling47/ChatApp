'use client'
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import  {RoomComponent } from '@/components/RoomComponent';
import UserSearch from './UserSearch';

interface RoomTab {
  type: 'room';
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

interface SearchTab {
  type: 'search';
}

type Tab = RoomTab | SearchTab;

export default function MultiRoomChat({ rooms }: { rooms: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    return pathname.includes('/SearchUser') 
      ? { type: 'search' }
      : { type: 'room', ...rooms[0] }
  });

  useEffect(() => {
    if (pathname.includes('/SearchUser')) {
      setActiveTab({ type: 'search' });
    }
  }, [pathname]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  
    if (tab.type === 'search') {
      router.push('/Home/SearchUser');
    } else {
      const roomIds = pathname
        .split('/')
        .filter(segment => segment && !isNaN(Number(segment)))
        .map(Number)
        .filter(id => id !== tab.RoomID);
  
      // Append the new room ID and join them
      const updatedRoomIds = [...roomIds, tab.RoomID];
      router.push(`/Home/${updatedRoomIds.join('/')}`);
    }
  };
  

  return (
    <div className='row-start-1 row-end-13 col-start-2 col-end-10 h-full flex flex-col'>
      <div className="flex border-b overflow-x-auto">
        {rooms.map((room) => (
          <button
            key={room.RoomID}
            onClick={() => handleTabChange({ type: 'room', ...room })}
            className={`px-4 py-2 min-w-[120px] ${
              activeTab.type === 'room' && (activeTab as RoomTab).RoomID === room.RoomID 
                ? 'border-b-2 border-[#ff7f11] font-medium' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {room.roomName}
          </button>
        ))}
        
        {pathname.includes('/SearchUser') && (
          <button
            onClick={() => handleTabChange({ type: 'search' })}
            className={`px-4 py-2 min-w-[120px] ${
              activeTab.type === 'search' 
                ? 'border-b-2 border-[#ff7f11] font-medium' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            User Search
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {activeTab.type === 'search' ? (
          <UserSearch />
        ) : (
          rooms.map((room) => (
            (activeTab as RoomTab).RoomID === room.RoomID && (
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
}