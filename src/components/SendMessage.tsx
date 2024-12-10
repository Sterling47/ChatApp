'use client'

import React from 'react'
import { sendMessageAction } from '@/app/actions/actions'

// (RoomID:number, userID:number | undefined)
const SendMessage = ({RoomID,userID}:{RoomID:number,userID:number|undefined}) => {
  return (
    <div className="form-wrapper">
        <form 
        action={async(formData: FormData) => {
        await sendMessageAction(formData, +RoomID, userID)
        }}
        >
          <input type="text" name='message'/>
          <button className='send-message-bttn'><img className='send-arrow-img' src="send.png" alt="" /></button>
        </form>
      </div>
  )
}

export default SendMessage