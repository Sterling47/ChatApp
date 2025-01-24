'use client'
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import { pusherClient } from "@/lib/pusher-client";
import { SeedUser } from "./SeedUser"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import RoomList from "./RoomList";

interface RoomProps {
  initialRooms: Room[]
  currentUser: User
}
const Nav:React.FC<RoomProps> = ({initialRooms, currentUser}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rooms] = useState(initialRooms)
  const [incomingRooms, setIncomingRooms] = useState<incomingRoom[]>([])
  const [user, setUser] = useState<User | undefined>(currentUser);
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }
  
   useEffect(() => {
    pusherClient.subscribe('rooms-channel')
    const createRoomHandler = (data: incomingRoom) => {
      setIncomingRooms(prev => [...prev,data])
    }
    pusherClient.bind('rooms-created', createRoomHandler) //bind to event name not channel
    return () => {
      pusherClient.unsubscribe('rooms-channel');
      pusherClient.unbind('rooms-created', createRoomHandler);
    }
   },[])

  return (
    <nav className="flex flex-col justify-start m-0.5 rounded-md list-none col-span-1 row-start-1 row-end-13">
      <div className="flex flex-row justify-around m-0.5 rounded-md bg-primary">
        <button className="bg-transparent text-white h-auto w-auto p-2 hover:cursor-pointer hover:text-[#ff7f11]" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.username}</h4>
        </button>
        {isModalOpen && (
          <div className="flex flex-col justify-end absolute top-10 left-3 bg-primary">
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



 