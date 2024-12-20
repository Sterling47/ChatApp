'use server';

import { pusher } from '@/lib/pusher'
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

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
        isPrivate: formData.get('private') === 'on',
        creatorID: existingUser?.id || 1,
      },
    });                                                       
    
    // Notify all subscribers about the new room
    pusher.trigger('rooms-channel', 'rooms-created', {
      id: newRoom.id,
      name: newRoom.name,
      isPrivate: newRoom.isPrivate,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    throw new Error('Failed to create room');
  }

}

export async function sendMessageAction(formData: FormData) {
  try {
    const message = formData.get('message') as string
    const userID = parseInt(formData.get('userID') as string, 10);
    const roomID = parseInt(formData.get('RoomID') as string, 10)
    await prisma.message.create({
      data: {
        content: message,
        userID: userID,
        roomID: roomID
      }
    })
    pusher.trigger(`${roomID}`, 'incoming-message', message)
  }
  catch (err) {
    console.error('Error creating room:', err);
    throw new Error ('Failed to create new message')
  }
}

