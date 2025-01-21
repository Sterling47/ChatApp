'use server';

import { pusher } from '@/lib/pusher'
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initialize } from 'next/dist/server/lib/render-server';
import { revalidatePath } from 'next/cache';

export async function createRoomAction(formData: FormData) {
  const {getUser} = getKindeServerSession();
  try {
    const user = await getUser();
    const existingUser = user.email? await prisma.user.findUnique({
      where: {email: user.email}
    }) : null

    // if (!existingUser?.id) {
    //   console.log('Room creation failed. User not found')
    //   return;
    // }
    const roomName = formData.get('room-name') as string;
    // if (!roomName) {
    //   console.log('Room creation failed: Missing room name');
    //   return;
    // }
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

export async function initialUserSetup(formData: FormData) {
  const { getUser } = getKindeServerSession();

  try {
    const user = await getUser();
    if (!user || !user.email) {
      throw new Error('User not authenticated');
    }

    const username = formData.get('username') as string;

    if (!username) {
      throw new Error('Username is required');
    }

    let dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    console.log(dbUser)
    if (dbUser) {
      const updatedUser = await prisma.user.upsert({
        where: {
          email: user.email,
        },

        update: {
          username,
          isFirstLogin: false
        },

        create: {
          email: user.email,
          username,
          isFirstLogin: true, 
          password: '',
        },
      });
      console.log('updateD', updatedUser)
    }
      
  } catch (error) {
    console.error('Error in initialUserSetup:', error);
    throw new Error('Failed to complete user setup');
  }
  revalidatePath('/Home')
}
