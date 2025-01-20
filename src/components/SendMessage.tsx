'use client'

import React from 'react'
import { sendMessageAction } from '@/app/actions/actions'
import Image from 'next/image'

const SendMessage = ({RoomID,userID}:{RoomID:number,userID: number | undefined}) => {
  return (
    <div className="flex bg-white justify-evenly items-center row-start-12 row-end-13 col-start-3 h-full w-full rounded-[16px]">
        <form  className='flex justify-evenly items-center w-full h-full'
        action={sendMessageAction}
        >
          <input type='hidden' name='RoomID' value={RoomID.toString()}/>
          <input type='hidden' name='userID' value={userID?.toString() || '1'}/>
          <textarea className='w-[90%] h-[70%] p-4 bg-white resize-none focus:outline-none rounded-xl text-black text-lg' name='message' placeholder=''/>
          <button className='grid place-items-center bg-white w-[8%] h-[70%] rounded-[6%] m-[0.2rem] hover:bg-[#ff1b1c]'><Image className='h-[2rem] w-[2rem]' src="/send.png" alt="" width={100} height={100} /></button>
        </form>
      </div>
  )
}

export default SendMessage