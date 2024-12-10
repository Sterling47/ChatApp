import React from 'react'
import prisma from '@/lib/db'

export default async function RoomPage({params}:{params: Promise<{RoomID: string}>}) {
  let {RoomID} = await params
  const messages = await prisma.message.findMany({
    where: {
      roomID: +RoomID
    }
  })
  const foundRoom = await prisma.room.findFirst({
    where: {
      id: +RoomID
    }
  })
  
  return (
    <>
      <div className='view-box'>

        <h2>{foundRoom?.name}</h2>
      {messages.length === 0 ? <p>No messages found..</p> : messages.map(({ id, content, userID }) => {
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
