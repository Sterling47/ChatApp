import React from 'react'
import type {Message} from '@prisma/client'

const Viewbox = ({messages}:{messages:Message[]}) => {
  return (
   <>
   <div className='view-box'>
      {messages.length? <p>No messages found..</p> : messages.map(({ id, content, userID }) => {
        return (
        <div key={id}>
            <p><span>{userID}</span>{content}</p>
        </div>)
      })}
    </div>
    <div className="form-wrapper">
      <form 
      // action={ async(formData: FormData) => {
      // await sendMessage(formData)
      // }}
      >
        <input type="text" name='message' disabled/>
        <button className='send-message-bttn'><img className='send-arrow-img' src="send.png" alt="" /></button>
      </form>
    </div>
   </>
  )
}

export default Viewbox