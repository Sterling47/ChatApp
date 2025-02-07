'use client'
import { createContext, useContext, useState } from 'react';
import { useRouter} from 'next/navigation';

type ActiveRoomContextType = {
  activeRoomId: number | 'search' | null;
  setActiveRoomId: (roomId: number | 'search') => void;
  openRooms: number[]
  setOpenRooms: (roomIds: number[]) => void;
};

const ActiveRoomContext = createContext<ActiveRoomContextType | null>(null);

export const ActiveRoomProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [activeRoomId, setActiveRoomState] = useState<number | 'search' | null>(null);
  const [openRooms, setOpenRooms] = useState<number[]>([])

  const setActiveRoomId = (roomId: number | 'search') => {
    setActiveRoomState(roomId);
    if (roomId === 'search') {
      router.push('/Home/SearchUser')
    }
    else {
      if (!openRooms.includes(roomId)) {
        const updatedOpenRooms = [...openRooms, roomId];
        setOpenRooms(updatedOpenRooms)
        router.push(`/Home/${updatedOpenRooms.join('/')}`);
      }
      else {
        router.push(`/Home/${openRooms.join('/')}`);
      }
    }
  };

  return (
    <ActiveRoomContext.Provider value={{ activeRoomId, setActiveRoomId, openRooms, setOpenRooms }}>
      {children}
    </ActiveRoomContext.Provider>
  );
};

export const useActiveRoom = () => {
  const context = useContext(ActiveRoomContext);
  if (!context) {
    throw new Error('useActiveRoom must be used within an ActiveRoomProvider');
  }
  return context;
};