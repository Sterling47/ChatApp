import prisma from '@/lib/db';
import MultiRoomChat from '@/components/MultiRoomChat';
import { getUser } from '@/lib/auth/user';

export default async function RoomPage({ params }: { params: Promise<{ RoomID: string[] | string }> }) {
  const { RoomID } = await params
  const roomIDs = Array.isArray(RoomID)
    ? RoomID.map(Number)
    : [Number(RoomID)];
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const allRooms = await Promise.all(
    roomIDs.map(async (roomID) => {
      const messages = await prisma.message.findMany({
        where: { roomID }, 
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      });
      const foundRoom = await prisma.room.findFirst({ where: { id: roomID } });

      if (!foundRoom) {
        throw new Error(`Room with ID ${roomID} not found`);
      }

      const serializedMessages = messages.map((message) => ({
        id: message.id,
        content: message.content,
        userID: message.userID,
        username: message.user.username,
        timeStamp: message.timeStamp,
      }));

      const existingUser = user.email
        ? await prisma.user.findUnique({ where: { email: user.email } })
        : null;

      if (!existingUser) {
        throw new Error("User not found");
      }

      return {
        RoomID: foundRoom.id,
        roomName: foundRoom.name,
        messages: serializedMessages,
        userID: existingUser.id,
      };
    })
  );
  return <MultiRoomChat rooms={allRooms} />;

}