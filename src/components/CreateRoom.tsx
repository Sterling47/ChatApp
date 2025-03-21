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
      (<div className="fixed inset-0 flex bg-coolGrey items-center justify-center z-21">
        <div className="flex flex-col justify-evenly items-center bg-primary text-white rounded-lg  w-[40%] h-[50%] shadow-room">
          <form className='flex flex-col h-[90%] w-[90%] justify-around items-start' action={async(formData: FormData) => {
            await createRoomAction(formData)
          }}>
              <label>Room Name:
              <input type='text' name='room-name' className='bg-gray-500 border-none'></input></label>
              <label>Private:
              <input type='checkbox' name='private' className='bg-gray-500 border-none'></input></label>
              <button type='submit' className='w-[30%] flex justify-center items-center p-0 bg-primary text-white'>Submit</button>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default CreateRoom
