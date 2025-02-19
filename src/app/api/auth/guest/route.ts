import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';
import { nanoid } from 'nanoid';
import rateLimit from 'next-rate-limit';
const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 100
})
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const headers = limiter.checkNext(req, 5)
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('Secret missing')
    }
    const guestNanoid = nanoid(6)
    const guestUsername = `chatt-r_${guestNanoid}`
    const newGuestUser = await prisma.user.create({
      data: {
        email: guestUsername,
        username: guestUsername,
        isGuest: true,
        password: null
      }
    })

    if (!newGuestUser) {
      return NextResponse.json(
        { message: 'Failed to create guest user' },
        { status: 401, headers }
      )
    }
    const userId = newGuestUser.id.toString()
    const response = NextResponse.json(
      {
        message: 'Successfully logged in as guest',
        redirectUrl: '/Home'
      },
      { 
        status: 200,
        headers 
      }
    );
    const sessionResponse = await createSession(
      response,
      userId,
      secret,
      true
    )
    return sessionResponse
  }
  catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login guest user' },
      { status: 500 }
    );
  }
}