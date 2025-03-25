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
          <textarea className='w-[87%] h-full lg:text-lg lg:p-4 p-2 px-3 resize-none focus:outline-none rounded-xl text-black overflow-hidden' 
          name='message' placeholder='Send a chat...' autoFocus/>
          <button className='flex items-center justify-center bg-white w-auto h-full rounded-xl min-w-[44px] aspect-square'>
            <IconContext.Provider value={{className:`text-black lg:w-10 lg:h-10 w-8 h-8 hover:cursor-pointer hover:text-[#175DFF]`}}>
              <LuSendHorizontal/>
            </IconContext.Provider>
          </button>
        </form>
      </div>
  )
}

export default SendMessage