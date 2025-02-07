'use client'
import { useState, useEffect } from "react"
import type { Room, User } from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import { SeedUser } from "./SeedUser"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import RoomList from "./RoomList";
import Link from "next/link";
import { useActiveRoom } from "@/app/contexts/ActiveRoomContext";

interface RoomProps {
  initialRooms: Room[]
  currentUser: User
}
const Nav: React.FC<RoomProps> = ({ initialRooms, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<User | undefined>(currentUser);
  const { setActiveRoomId } = useActiveRoom();
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }
  useEffect(() => {
    async function fetchUser() {
      try {
        const foundUser = await SeedUser()
        if (foundUser) {
          setUser(foundUser);
        }
      }
      catch (error) {
        console.log('Error seeding user:', error)
      }
    }
    fetchUser();
  }, [])
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
            <LogoutLink
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black"
              postLogoutRedirectURL={'/'}>Logout</LogoutLink>
            <Link href="/Home/SearchUser"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>Search User</Link>
            <Link href="/Home/FriendsList"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>Friends</Link>
<Link href="/Home/Settings"
  className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:text-black" onClick={toggleSearch}>Settings</Link>
          </div>
        )}
      </div>
      <RoomList initialRooms={initialRooms} />
      <CreateRoom />

    </nav>
  )
}

export default Nav