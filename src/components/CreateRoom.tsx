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
    <div className='fixed bottom-4 left-2 z-20'>
      <Fab color="primary" aria-label="add" onClick={toggleModal}>
        <AddIcon />
      </Fab>
      {isModalOpen && 
      (<div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center z-21">
        <div className="flex flex-col justify-evenly items-center bg-primary text-white rounded-lg  w-[60%] h-[50%] shadow-room">
          <form className='flex flex-col h-[90%] w-[90%] justify-around items-start' action={async(formData: FormData) => {
            await createRoomAction(formData)
          }}> 
                <h3 className="text-lg font-semibold mb-4">Create a New Chat Room</h3>
                <div className="mb-4 w-full">
                <label className="block mb-2">Room Name:</label>
                <input type='text' name='room-name' className='w-full p-2 bg-gray-500 border-none rounded-md'></input>
                </div>
                <div className="mb-4 w-full">
                <label className="block mb-2">Private:</label>
                <input type='checkbox' name='private' className='bg-gray-500 border-none'></input>
                </div>
                <button type='submit' className='w-full p-2 rounded-md bg-slate-700 text-white'>Submit</button>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default CreateRoom
