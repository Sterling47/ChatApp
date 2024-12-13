'use client'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { LogoutButton } from "./LogoutButton"
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import Link from "next/link"
import publicChat from '/public/public-chat-icon.png'
import Image from "next/image"
import { pusherClient } from '@/lib/pusher-client'

interface RoomProps {
  initialRooms: Room[]
  user: User
}
const Nav:React.FC<RoomProps> = ({initialRooms,user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rooms, setRooms] = useState(initialRooms)
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }
  useEffect(() => {
    const channel = pusherClient.subscribe('rooms')
    channel.bind('new-room', (data: { name: string; id: number; password: string | null; isPrivate: boolean; creatorID: number }) => {
      setRooms(initialRooms => [...initialRooms,data])
    })
   },[])
   
  return (
    <nav>
      <div className="user-bar">
        <button className="user-bttn" onClick={toggleModal}>
          <h4>{user.email}</h4>
        </button>
        {isModalOpen && (
          <div className="user-modal">
            <LogoutButton>
              <LogoutLink className="lo-link">Logout</LogoutLink>
            </LogoutButton>
          </div>
        )}
        <ul className='nav-menu-wrapper'>
          <li> <Image className="icon" src={'/private-chat-icon.png'} 
          width={100}
          height={100}
          alt="" /></li>
          <li> <Image className="icon" src={"/public-chat-icon.png"} 
          width={100}
          height={100}
          alt="" /></li>
        </ul>
      </div>
      <div className="user-select-display"> 
        {rooms.map(({id,name}) => {
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