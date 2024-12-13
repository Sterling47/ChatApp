'use client'

import React from 'react'
import { sendMessageAction } from '@/app/actions/actions'
import Image from 'next/image'
// (RoomID:number, userID:number | undefined)
const SendMessage = ({RoomID,userID}:{RoomID:number,userID: number | undefined}) => {
  //subscribe user
  return (
    <div className="form-wrapper">
        <form 
        action={sendMessageAction}
        >
          <input type='hidden' name='RoomID' value={RoomID.toString()}/>
          <input type='hidden' name='userID' value={userID?.toString() || '1'}/>
          <input type="text" name='message'/>
          <button className='send-message-bttn'><Image className='send-arrow-img' src="/send.png" alt="" width={100} height={100} /></button>
        </form>
      </div>
  )
}

export default SendMessage