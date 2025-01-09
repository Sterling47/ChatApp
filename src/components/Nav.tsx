'use client'
import { LogoutButton } from "./LogoutButton"
import { useState, useEffect } from "react"
import type {Room,User} from '@prisma/client'
import CreateRoom from '@/components/CreateRoom';
import Link from "next/link"
import { pusherClient }  from '@/lib/pusher-client'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { SeedUser } from "./SeedUser"

interface incomingRoom {
  id: number
  name: string
  isPrivate: boolean
}
interface RoomProps {
  initialRooms: Room[]
}
const Nav:React.FC<RoomProps> = ({initialRooms}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPrivateRooms, setShowPrivateRooms] = useState(false)
  const [rooms] = useState(initialRooms)
  const [incomingRooms, setIncomingRooms] = useState<incomingRoom[]>([])
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
    <nav className="flex flex-col justify-start m-0.5 rounded-md w-70 max-w-fit list-none col-start-1 col-end-3 row-start-1 row-end-13">
      <div className="flex flex-row justify-around m-0.5 rounded-md bg-primary">
        <button className="bg-transparent text-white h-auto w-auto p-2" onClick={toggleModal}>
          <h4 className="hover:cursor-pointer" id='username'>{user?.email}</h4>
        </button>
        {isModalOpen && (
          <div className="flex flex-col justify-end absolute top-10 left-3 bg-primary">
            <LogoutButton/>
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
      <CreateRoom/>
    </nav>
  )
}

export default Nav



 