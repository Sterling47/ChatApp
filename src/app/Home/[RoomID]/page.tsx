import React from 'react'
import prisma from '@/lib/db'
import SendMessage from '@/components/SendMessage';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function RoomPage({params}:{params: Promise<{RoomID: string}>}) {
  let {RoomID} = await params
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  const existingUser = user.email? await prisma.user.findUnique({
      where: {email: user.email}
    }) : null
  const userID = existingUser?.id
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
            <p>{content}</p>
        </div>)
      })}
      </div>
      <SendMessage RoomID={+RoomID} userID={userID}/>
  </>
  )
}
