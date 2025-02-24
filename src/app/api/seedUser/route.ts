import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const resp = await request.json();
    const existingUser = resp.userId? await prisma.user.findUnique({
      where: {id: +resp.userId}
    }) : null
    if (existingUser) {
      return NextResponse.json(existingUser, {status: 200})
    }
    const newUser = await prisma.user.create({
      data: {
        email: resp.email ?? '',
        username: `chatter${resp.userId}`,
        password: ''
      }
    })
    return NextResponse.json(newUser, { status: 201 })
  }
  catch (err){
    return NextResponse.json({error: 'Failed to seed user', err},{ status: 500 })
  }
}


