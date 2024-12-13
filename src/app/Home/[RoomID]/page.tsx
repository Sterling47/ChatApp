import React from 'react'
import prisma from '@/lib/db'
import SendMessage from '@/components/SendMessage';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Messages } from '@/components/Messages';
export default async function RoomPage({params}:{params: Promise<{RoomID: string}>}) {
  let { RoomID } = await params
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  console.log('params:', RoomID)
  const numericRoomID = Number(RoomID);
  // if (isNaN(numericRoomID)) {

  //   throw new Error('Invalid RoomID. It must be a number.');
  // }

  const existingUser = user.email? await prisma.user.findUnique({
      where: {email: user.email}
    }) : null
  const userID = existingUser?.id
  const messages = await prisma.message.findMany({
    where: {
      roomID: numericRoomID
    }
  })
  const foundRoom = await prisma.room.findFirst({
    where: {
      id: numericRoomID
    }
  })
  
  return (
    <>
      <div className='view-box'>

        <h2>{foundRoom?.name}</h2>
      <Messages initialMessages={messages} RoomID={+RoomID}/>
      </div>
      <SendMessage RoomID={+RoomID} userID={userID}/>
  </>
  )
}
