import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const { user } = await request.json();
    const existingUser = user.email? await prisma.user.findUnique({
      where: {email: user.email}
    }) : null
    if (existingUser) {
      return NextResponse.json(existingUser, {status: 200})
    }
    const newUser = await prisma.user.create({
      data: {
        email: user.email ?? '',
        username: `chatter${user.id}`,
        password: ''
      }
    })
    return NextResponse.json(newUser, { status: 201 })
  }
  catch (error){
    return NextResponse.json({error: 'Failed to seed user'},{ status: 500 })
  }
}


