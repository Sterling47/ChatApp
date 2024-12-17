'use client'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { LogoutButton } from "./LogoutButton"
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import Link from "next/link"
import { pusherClient } from '@/lib/pusher-client'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";

interface incomingRoom {
  id: number
  name: string
  isPrivate: boolean
}
interface RoomProps {
  initialRooms: Room[]
  user: User
}
const Nav:React.FC<RoomProps> = ({initialRooms,user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPrivateRooms, setShowPrivateRooms] = useState(false)
  const [rooms, setRooms] = useState(initialRooms)
  const [incomingRooms, setIncomingRooms] = useState<incomingRoom[]>([])
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
    <nav>
      <div className="user-bar">
        <button className="user-bttn" onClick={toggleModal}>
          <h4 id='username'>{user.email}</h4>
        </button>
        {isModalOpen && (
          <div className="user-modal">
            <LogoutButton>
              <LogoutLink className="lo-link">Logout</LogoutLink>
            </LogoutButton>
          </div>
        )}
        <ul className='nav-menu-wrapper'>
          <li> 
            <IconContext.Provider 
            value={{color: '#ff7f11', size: '1.4em', className:"chat-icon"}}>
              <RiGitRepositoryPrivateFill onClick={() => setShowPrivateRooms(true)}/>
            </IconContext.Provider>
          </li>
          <li>
            <IconContext.Provider value={{color: '#ff7f11', size: '1.4em', className:"chat-icon"}}>
             <MdOutlinePublic onClick={() => setShowPrivateRooms(false)}/>
            </IconContext.Provider>
          </li>
        </ul>
      </div>
      <div className="user-select-display"> 
        {rooms.filter(room => showPrivateRooms === room.isPrivate).map(({id,name}) => {
        return (
          <div key={id}>
            <Link  className='room-link' href={`/Home/${id}`}>{name}</Link>
          </div>)
        })}
        {incomingRooms?.filter(room => showPrivateRooms === room.isPrivate).map(({id,name}) => {
        return (
          <div key={id}>
            <Link  className='room-link' href={`/Home/${id}`}>{name}</Link>
          </div>)
        })}
      </div>
      <CreateRoom user={user}/>
    </nav>
  )
}

export default Nav