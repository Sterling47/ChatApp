import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const {roomName, isPrivate, user} = await request.json();
    const newRoom = {roomName, isPrivate, user}
    const createdRoom = await prisma.room.create({
      data: {
        name: roomName,
        isPrivate: isPrivate,
        creator: user
      }
    })
    return NextResponse.json(newRoom, { status: 201 })
  }
  catch (err) {
    return NextResponse.json({error: 'Failed to create new room'},{ status: 500 })
  }
}