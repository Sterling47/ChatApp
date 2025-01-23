import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import MultiRoomChat from '@/components/MultiRoomChat';
export default async function RoomPage({ params }: { params: { RoomID: string[]} }) {

  const roomIDs = params.RoomID.map(Number)
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error ('User not found')
  }
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
        RoomID: foundRoom!.id,
        roomName: foundRoom?.name,
        messages: serializedMessages,
        userID: userID
      }
    })
  );

  return (
    <MultiRoomChat rooms={allRooms}/>
  )
}
