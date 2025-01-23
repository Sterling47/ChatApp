'use client'
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import Link from "next/link"
import { pusherClient }  from '@/lib/pusher-client'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { SeedUser } from "./SeedUser"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface RoomProps {
  initialRooms: Room[]
}
const Nav:React.FC<RoomProps> = ({initialRooms}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
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
    
    pusherClient.subscribe('rooms-channel')
    const createRoomHandler = (data: Room) => {
      setRooms(prev => [...prev,{...data,isIncoming:true}])
    }
    pusherClient.bind('rooms-created', createRoomHandler) //bind to event name not channel
    return () => {
      pusherClient.unsubscribe('rooms-channel');
      pusherClient.unbind('rooms-created', createRoomHandler);
    }
   },[])

  const renderRoomLink = (room: Room) => (
    <div className='flex' key={room.id}>
    <IconContext.Provider value={{className:"text-[#ff7f11] w-6 h-6"}}>
      {room.isPrivate ? <RiGitRepositoryPrivateFill /> : <MdOutlinePublic />}
    </IconContext.Provider>
    <Link 
      className='text-grey no-underline ml-8 text-sm hover:text-[#ff7f11]' 
      href={`/Home/${room.id}`}
    >
      {room.name}
    </Link>
  </div>
  ) 

  return (
    <nav className="flex flex-col justify-start m-0.5 rounded-md list-none col-span-1 row-start-1 row-end-13">
      <div className="flex flex-row justify-around m-0.5 rounded-md bg-primary">
        <button className="bg-transparent text-white h-auto w-auto p-2 hover:cursor-pointer hover:text-[#ff7f11]" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.email}</h4>
        </button>
        {isModalOpen && (
          <div className="flex flex-col justify-end absolute top-10 left-3 bg-primary">
            <LogoutLink postLogoutRedirectURL={'/'}>Logout</LogoutLink>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 h-full bg-primary m-0.5 rounded-md"> 
        {rooms.map(renderRoomLink)}
      </div>
      <CreateRoom/>
    </nav>
  )
}

export default Nav



 