import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const {room} = await request.json();
    const {roomName, isPrivate, user} = room
    const createdRoom = await prisma.room.create({
      data: {
        name: roomName,
        isPrivate: isPrivate,
        creatorID: user.id
      }
    })
    return NextResponse.json(createdRoom.id)
  }
  catch (err) {
    return NextResponse.json({error: 'Failed to create new room'},{ status: 500 })
  }
}