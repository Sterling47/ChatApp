'use client'
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import { SeedUser } from "./SeedUser"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import RoomList from "./RoomList";

interface RoomProps {
  initialRooms: Room[]
}
const Nav:React.FC<RoomProps> = ({initialRooms}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<User | undefined>(undefined);

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
   },[])

  return (
    <nav className="flex flex-col justify-start m-0.5 rounded-md list-none col-span-1 row-start-1 row-end-13 overflow-hidden">
      <div className="flex flex-row justify-around m-0.5 rounded-md bg-primary">
        <button className="bg-transparent text-white h-auto w-auto p-2 hover:cursor-pointer hover:text-[#ff7f11]" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.email}</h4>
        </button>
        {isModalOpen && (
          <div className="absolute top-10 left-2 bg-primary p-2 z-10">
            <LogoutLink postLogoutRedirectURL={'/'}>Logout</LogoutLink>
          </div>
        )}
      </div>
      <RoomList initialRooms={initialRooms}/>
      <CreateRoom/>
    </nav>
  )
}

export default Nav



 