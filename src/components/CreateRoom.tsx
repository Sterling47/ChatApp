'use client'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import type {User} from '@prisma/client'

const CreateRoom = ({user}:{user:User}) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomName, setRoomName] = useState('');
  const toggleModal = () => {
    setModalOpen(prev => !prev);
  }
  const createRoom = async (roomName:string, isPrivate:boolean) => {
    const room = {isPrivate, user, roomName}
    const res = await fetch('http://localhost:3000/api/createRoom',{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({room})
    })
    const roomID = res.json();
    router.push(`/room/${roomID}`)
  }
  return (
    <div className='create-room-bttn'>
      <Fab color="primary" aria-label="add" onClick={toggleModal}>
      <AddIcon />
      </Fab>
      {isModalOpen && 
      (<div className="add-room-modal">
            <label>Room Name:
            <input type='text' name='room-name' value={roomName} onChange={e => setRoomName(e.target.value)}></input></label>
            <label>Private:
            <input type='checkbox' name='private' checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} ></input></label>
            <button onClick={() => createRoom}>Submit</button>
        </div>
      )}
    </div>
  )
}

export default CreateRoom
