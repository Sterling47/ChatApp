'use server';

import { pusher } from '@/lib/pusher'
import prisma from '@/lib/db';
import { getUser } from '@/components/getUser';
import { revalidatePath } from 'next/cache';

export async function createRoomAction(formData: FormData) {

  try {
    const user = await getUser();
    const existingUser = user?.email? await prisma.user.findUnique({
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
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })
    
    pusher.trigger(`${roomID}`, 'incoming-message', {
      ...messageContent,
      username: messageContent.user.username
    })
  }
  catch (err) {
    console.error('Error creating room:', err);
    return;
  }
}

export async function initialUserSetup(formData: FormData) {
  try {
    const user = await getUser();
    if (!user || !user.email) {
      throw new Error('User not authenticated');
    }

    const username = formData.get('username') as string;

    if (!username) {
      throw new Error('Username is required');
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    
    if (dbUser) {
      await prisma.user.upsert({
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
    }
      
  } catch (error) {
    console.error('Error setting up user:', error);
    throw error;
  }
  revalidatePath('/Home')
}


export async function addFriend(formData: FormData): Promise<void> {
  try {
    const user = await getUser();
    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    const friendId = Number(formData.get("friendId"));

    if (!friendId || friendId === currentUser.id) {
      throw new Error("Invalid friend ID");
    }

    const friendUser = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friendUser) {
      throw new Error("Friend user not found");
    }

    const existingFriendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userID: currentUser.id, friendID: friendId },
          { userID: friendId, friendID: currentUser.id },
        ],
      },
    });

    if (existingFriendship) {
      throw new Error("Already friends");
    }

    await prisma.friend.createMany({
      data: [
        { userID: currentUser.id, friendID: friendId },
        { userID: friendId, friendID: currentUser.id },
      ],
    });

    revalidatePath("/Home/FriendsList"); 
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
}