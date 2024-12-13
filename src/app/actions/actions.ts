'use server';

import { pusher } from '@/lib/pusher'
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';


export async function createRoomAction(formData: FormData) {
  const {getUser} = getKindeServerSession();
  try {
    const user = await getUser();
    const existingUser = user.email? await prisma.user.findUnique({
      where: {email: user.email}
    }) : null
    const newRoom = await prisma.room.create({
      data: {
        name: formData.get('room-name') as string,
        isPrivate: formData.get('is-private') === 'on',
        creatorID: existingUser?.id || 1,
      },
    });                                                       
    
    // Notify all subscribers about the new room
    await pusher.trigger('rooms', 'room-created', {
      id: newRoom.id,
      name: newRoom.name,
      isPrivate: newRoom.isPrivate,
    });
    revalidatePath('/Home') 
  } catch (error) {
    console.error('Error creating room:', error);
    throw new Error('Failed to create room');
  }

}

export async function sendMessageAction(formData: FormData) {
  const message = formData.get('message') as string
  const userID = parseInt(formData.get('userID') as string , 10 || 1);
  const roomID = parseInt(formData.get('RoomID') as string, 10)
  const newRoomMessage = await prisma.message.create({
    data: {
      content: message,
      userID: userID,
      roomID: roomID
    }
  })

}

