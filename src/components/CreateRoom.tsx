'use client'
import React, {useState} from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createRoomAction } from '@/app/actions/actions';
const CreateRoom = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(prev => !prev);
  }

  return (
    <div className='fixed bottom-4 left-4 z-20'>
      <Fab color="primary" aria-label="add" onClick={toggleModal}>
        <AddIcon />
      </Fab>
      {isModalOpen && 
      (<div className="flex flex-col justify-evenly fixed bottom-20 left-4 bg-primary rounded-room}
      text-white rounded-lg p-4 w-[20%] h-auto shadow-room z-21">
        <form action={async(formData: FormData) => {
          await createRoomAction(formData)
        }}>
            <label>Room Name:
            <input type='text' name='room-name' className='bg-gray-500 border-none'></input></label>
            <label>Private:
            <input type='checkbox' name='private' className='bg-gray-500 border-none'></input></label>
            <button type='submit' className='w-[30%] flex justify-center items-center p-0 bg-primary text-white'>Submit</button>
        </form></div>
      )}
    </div>
  )
}

export default CreateRoom
