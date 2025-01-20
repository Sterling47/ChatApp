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

    if (!existingUser?.id) {
      console.log('Room creation failed. User not found')
      return;
    }
    const roomName = formData.get('room-name') as string;
    if (!roomName) {
      console.log('Room creation failed: Missing room name');
      return;
    }
    const newRoom = await prisma.room.create({
      data: {
        name: roomName,
        isPrivate: formData.get('private') === 'on',
        creatorID: existingUser?.id || 1,
      },
    });                                                       
    
    pusher.trigger('rooms-channel', 'rooms-created', {
      id: newRoom.id,
      name: newRoom.name,
      isPrivate: newRoom.isPrivate,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    return;
  }

}

export async function sendMessageAction(formData: FormData) {
  try {
    const message = formData.get('message') as string
    const userID = parseInt(formData.get('userID') as string, 10);
    const roomID = parseInt(formData.get('RoomID') as string, 10)
    if (!message || !userID || !roomID) {
      console.log('Missing fields', {
        message: message || 'missing',
        userID: userID || 'missing',
        roomID: roomID || 'missing'
      })
      return;
    }
    const messageContent = await prisma.message.create({
      data: {
        content: message,
        userID: userID,
        roomID: roomID,
      }
    })
    pusher.trigger(`${roomID}`, 'incoming-message', messageContent)
  }
  catch (err) {
    console.error('Error creating room:', err);
    return;
  }
}

