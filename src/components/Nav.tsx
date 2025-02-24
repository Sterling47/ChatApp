'use client'
import { useState } from "react"
import type { Room } from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import RoomList from "./RoomList";
import Link from "next/link";
import { useActiveRoom } from "@/app/contexts/ActiveRoomContext";
import { useUser } from "@/app/contexts/UserContext";
import { LogoutButton } from "./LogoutButton";
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
    <nav className="flex flex-col justify-start m-0.5 rounded-md list-none col-span-1 row-start-1 row-end-13 overflow-hidden">
      <div className="flex flex-row justify-around m-0.5 rounded-md bg-primary">
        <button className="bg-transparent text-white h-auto w-auto p-2 hover:cursor-pointer hover:text-[#ff7f11]" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.username}</h4>
        </button>
        {isModalOpen && (
          <div className="flex flex-col absolute top-10 left-2 bg-primary p-2 z-10">
            <Link href="/Home/FriendsList"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>Friends</Link>
            <Link href="/Home/SearchUser"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>
              <span className="text-sm">Search User</span>
            </Link>
            <Link href="/Home/Settings/Profile"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black">
              <span className="text-sm">Settings</span>
            </Link>
            <LogoutButton/>
          </div>
        )}
      </div>
      <RoomList initialRooms={initialRooms} />
      <CreateRoom />

    </nav>
  )
}

export default Nav