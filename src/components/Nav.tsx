'use client'
import { useState } from "react"
import type { Room } from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import RoomList from "./RoomList";
import Link from "next/link";
import { useActiveRoom } from "@/app/contexts/ActiveRoomContext";
import { useUser } from "@/app/contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
import { Users, Search, Settings } from 'lucide-react';
import RoomModalforMobile from "./RoomModalforMobile";

interface RoomProps {
  initialRooms: Room[]
}

const Nav: React.FC<RoomProps> = ({ initialRooms }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useUser();
  const { setActiveRoomId } = useActiveRoom();
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }

  const toggleSearch = () => {
    setActiveRoomId('search');
    toggleModal();
  }

  return (
    <nav className="flex flex-col justify-start m-0.5 rounded-md list-none col-start-1 col-end-13 row-start-1 row-end-3 bg-black md:row-start-1 md:row-end-13 md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-3 overflow-hidden">
      <div className="flex flex-row  justify-around items-center bg-primary rounded-md h-full md:h-[10%]">
        <button className="bg-transparent text-white  p-4 w-auto hover:cursor-pointer hover:text-[#ff7f11]" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.username}</h4>
        </button>
        {isModalOpen && (
          <div className="flex flex-col absolute top-10 left-2 bg-primary p-2 z-10">
            <Link href="/Home/FriendsList"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>
              <Users size={18} />
              <span className="text-sm">Friends</span>
            </Link>
            <Link href="/Home/SearchUser"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>
              <Search size={18} />
              <span className="text-sm">Search</span>
            </Link>
            <Link href="/Home/Settings/Profile"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </Link>
            <LogoutButton />
          </div>
        )}
        <RoomModalforMobile initialRooms={initialRooms} />
      </div>
      <div className="hidden h-full md:block">
        <RoomList initialRooms={initialRooms} />
      </div>
      {user?.isGuest === false && <CreateRoom />}
    </nav>
  )
}

export default Nav