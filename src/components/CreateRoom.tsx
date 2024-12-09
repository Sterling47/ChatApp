'use client'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import type {User} from '@prisma/client'
import prisma from '@/lib/db';
import { createRoomAction } from '@/app/actions/actions';
const CreateRoom = ({user}:{user:User}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const router = useRouter();

  const toggleModal = () => {
    setModalOpen(prev => !prev);
  }
  // const createRoom = async (roomName:string, isPrivate:boolean) => {
  //   const room = {isPrivate, user, roomName}
  //   const res = await fetch('http://localhost:3000/api/createRoom',{
  //     method:'POST',
  //     headers: {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({room})
  //   })
  //   const roomID = await res.text();
    // router.push(`/Room/${roomID}`)
// }

  return (
    <div className='create-room-bttn'>
      <Fab color="primary" aria-label="add" onClick={toggleModal}>
        <AddIcon />
      </Fab>
      {isModalOpen && 
      (<div className="add-room-modal">
        <form action={async(formData: FormData) => {
          await createRoomAction(formData)
        }}>
            <label>Room Name:
            <input type='text' name='room-name'></input></label>
            <label>Private:
            <input type='checkbox' name='private'></input></label>
            <button type='submit'>Submit</button>
        </form></div>
      )}
    </div>
  )
}

export default CreateRoom
