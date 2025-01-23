'use client'

import { useState, useEffect } from "react"
import type {Room} from '@prisma/client'
import Link from "next/link"
import { pusherClient }  from '@/lib/pusher-client'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";

interface RoomProps {
  initialRooms: Room[]
}
const RoomList:React.FC<RoomProps> = ({initialRooms}) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)

  useEffect(() => {
    pusherClient.subscribe('rooms-channel')
    const createRoomHandler = (data: Room) => {
      setRooms(prev => [...prev,{...data, isIncoming:true}])
    }
    pusherClient.bind('rooms-created', createRoomHandler)
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
    <div className="flex flex-col gap-1 h-full bg-primary m-0.5 rounded-md"> 
      {rooms.map(renderRoomLink)}
    </div>
  )
}

export default RoomList



 