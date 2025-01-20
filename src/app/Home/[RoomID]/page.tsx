import React from 'react'
import prisma from '@/lib/db'
import SendMessage from '@/components/SendMessage';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Messages } from '@/components/Messages';
export default async function RoomPage({ params }: { params: Promise<{ RoomID: string }> }) {
  const { RoomID } = await params
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const numericRoomID = Number(RoomID);

  const existingUser = user.email ? await prisma.user.findUnique({
    where: { email: user.email }
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
  const serializedMessages = messages.map((message) => ({
    id: message.id,
    content: message.content,
    userID: message.userID,
    timeStamp: message.timeStamp
  }))

  return (
    <div className='row-start-1 row-end-13 col-start-2 col-end-10'>
      <div className="h-[10%] w-fullrounded-sm ">
        <h2 className='py-6 text-center text-2xl'>{foundRoom?.name}</h2>

      </div>

      <Messages initialMessages={serializedMessages} RoomID={+RoomID} creatorID={userID}/>

      <div className="h-[10%] w-full bg-primary">
        <SendMessage RoomID={+RoomID} userID={userID} />
      </div>
    </div>
  )
}
