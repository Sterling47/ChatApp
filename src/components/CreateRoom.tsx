'use client'
import React, {useState} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import type {User} from '@prisma/client'
import { createRoomAction } from '@/app/actions/actions';
const CreateRoom = ({user}:{user:User}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(prev => !prev);
  }

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
