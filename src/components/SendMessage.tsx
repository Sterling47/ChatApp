'use client'
import React from 'react'
import { sendMessageAction } from '@/app/actions/actions'
import { LuSendHorizontal } from "react-icons/lu";
import { IconContext } from "react-icons";

const SendMessage = ({RoomID,userID}:{RoomID:number,userID: number | undefined}) => {
  return (
    <div className="flex bg-white justify-evenly items-center h-[40%] w-[85%] md:w-full lg:h- rounded-[16px]
      focus-within:outline focus-within:outline-2 focus-within:outline-[#175DFF]">
        <form  className='flex justify-between items-center w-full h-full '
        action={sendMessageAction}
        >
          <input type='hidden' name='RoomID' value={RoomID.toString()}/>
          <input type='hidden' name='userID' value={userID?.toString() || '1'}/>
          <textarea className='w-[87%] h-full p-2 resize-none focus:outline-none rounded-xl text-black text-lg overflow-hidden' 
          name='message' placeholder='Send a chat...' autoFocus/>
          <button className='grid place-items-center bg-white w-[13%] h-[70%] rounded-xl  '>
            <IconContext.Provider value={{className:`text-black w-10 h-10 hover:cursor-pointer hover:text-[#175DFF]`}}>
              <LuSendHorizontal/>
            </IconContext.Provider>
          </button>
        </form>
      </div>
  )
}

export default SendMessage