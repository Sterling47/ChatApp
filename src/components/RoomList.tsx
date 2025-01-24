'use client'

import { useState, useEffect } from "react"
import type {Room} from '@prisma/client'
import { pusherClient }  from '@/lib/pusher-client'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useRouter } from "next/navigation";

interface RoomProps {
  initialRooms: Room[]
}
const RoomList:React.FC<RoomProps> = ({initialRooms}) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const router = useRouter();
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
   const joinRoom = (roomID: number) => {
    const currentPath = window.location.pathname;
    const existingRoomIDs = currentPath
    .split('/')
    .filter((segment) => segment !== '' && !isNaN(Number(segment)))
    .map(Number)

    if (!existingRoomIDs.includes(roomID)) {
      existingRoomIDs.push(roomID);
    }
    const newURL = `/Home/${existingRoomIDs.join('/')}`
    router.push(newURL)
   }

  const renderRoomLink = (room: Room) => (
    <div className='flex items-center overflow-y-auto' key={room.id}>
      <IconContext.Provider value={{className:"text-[#ff7f11] w-6 h-6 flex-shrink-0"}}>
        {room.isPrivate ? <RiGitRepositoryPrivateFill /> : <MdOutlinePublic />}
      </IconContext.Provider>
      <button 
        className='text-grey no-underline ml-2 text-sm hover:text-[#ff7f11] overflow-x-hidden truncate' 
        onClick={() => joinRoom(room.id)}
      >
      {room.name}
      </button>
    </div>
  ) 

  return (
    <div className="flex flex-col gap-1 h-full bg-primary m-0.5 rounded-md p-2"> 
      {rooms.map(renderRoomLink)}
    </div>
  )
}

export default RoomList



 