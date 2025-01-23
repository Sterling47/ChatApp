import React from 'react'
import prisma from '@/lib/db'
import SendMessage from '@/components/SendMessage';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Messages } from '@/components/Messages';
import { RoomComponent } from '@/components/RoomComponent';
export default async function RoomPage({ params }: { params: { RoomID: string[]} }) {
  const roomIDs = params.RoomID.map(Number)
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const allRooms = await Promise.all(
    roomIDs.map(async (roomID) => {
      const messages = await prisma.message.findMany({
        where: {
          roomID: roomID
        }
      })
      const foundRoom = await prisma.room.findFirst({
        where: {
          id: roomID
        }
      })
      const serializedMessages = messages.map((message) => ({
        id: message.id,
        content: message.content,
        userID: message.userID,
        timeStamp: message.timeStamp
      }))
      const existingUser = user.email ? await prisma.user.findUnique({
        where: { email: user.email }
      }) : null
      const userID = existingUser!.id
      return {
        roomID,
        roomName: foundRoom?.name,
        messages: serializedMessages,
        userID: userID
      }
    })
  );

  return (
    <>
      {allRooms.map((room) => (
        <RoomComponent
        key={room.roomID}
        RoomID={room.roomID}
        initialMessages={room.messages}
        roomName={room.roomName}
        userID={room.userID}
        />
      ))}
    </>
  )
}
