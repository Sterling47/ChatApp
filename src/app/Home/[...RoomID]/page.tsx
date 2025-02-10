import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MultiRoomChat from "@/components/MultiRoomChat";

interface PageProps {
  params: Promise<{ RoomID: string[] }>; 
}

export default async function RoomPage({ params }: PageProps) {
  const { RoomID } = await params; 
  const roomIDs = RoomID.map(Number);

  if (roomIDs.some(isNaN)) {
    throw new Error("Invalid room ID");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const allRooms = await Promise.all(
    roomIDs.map(async (roomID) => {
      const messages = await prisma.message.findMany({ where: { roomID } });
      const foundRoom = await prisma.room.findFirst({ where: { id: roomID } });

      if (!foundRoom) {
        throw new Error(`Room with ID ${roomID} not found`);
      }

      const serializedMessages = messages.map((message) => ({
        id: message.id,
        content: message.content,
        userID: message.userID,
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
