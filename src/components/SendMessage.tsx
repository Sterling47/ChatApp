'use client'
import React from 'react'
import { sendMessageAction } from '@/app/actions/actions'
import { LuSendHorizontal } from "react-icons/lu";
import { IconContext } from "react-icons";

const SendMessage = ({RoomID,userID}:{RoomID:number,userID: number | undefined}) => {
  return (
    <div className="flex bg-white justify-evenly items-center row-start-12 row-end-13 col-start-3 h-full w-full rounded-[16px]">
        <form  className='flex justify-evenly items-center w-full h-full'
        action={sendMessageAction}
        >
          <input type='hidden' name='RoomID' value={RoomID.toString()}/>
          <input type='hidden' name='userID' value={userID?.toString() || '1'}/>
          <textarea className='w-[90%] h-[70%] p-4 bg-white resize-none focus:outline-none rounded-xl text-black text-lg' name='message'/>
          <button className='grid place-items-center bg-white w-[8%] h-[70%] rounded-xl m-[0.2rem] hover:bg-blue-300'>
            <IconContext.Provider value={{color:'#175DFF', className: 'w-10 h-10 hover:cursor-pointer '}}>
              <LuSendHorizontal/>
            </IconContext.Provider>
          </button>
        </form>
      </div>
  )
}

export default SendMessage