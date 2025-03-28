'use client'
import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createRoomAction } from '@/app/actions/actions';
import { X } from 'lucide-react';
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
            <div className="w-full flex justify-between items-center mb-4 p-12">
              <h3 className="text-lg font-semibold ">Create a New Chat Room</h3>
              <button
                onClick={toggleModal}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <form className='flex flex-col h-[90%] w-[90%] justify-around items-start' action={async (formData: FormData) => {
              await createRoomAction(formData)
            }}>
              <div className="w-full">
                <label className="block mb-2">Room Name:</label>
                <input type='text' name='room-name' className='w-full p-2 bg-gray-500 border-none rounded-md'></input>
              </div>
              <div className="w-full">
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
