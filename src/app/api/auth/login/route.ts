import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'next-rate-limit';
import { createSession } from '@/lib/auth/session';
// import { verifyPassword } from '@/components/Password';

const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 100
})

export const POST = async (req: NextRequest, resp: NextResponse) => {
  try {
    const headers = limiter.checkNext(req, 25)
    const secret = process.env.JWT_SECRET!
    const body = await req.json()
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400, headers}
      )
    }

    const foundUser = await prisma.user.findUnique({
      where: { email: email,
        password: password
      }
    })

    if (!foundUser) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401, headers }
      )
    }

    // const isPasswordValid = await verifyPassword(foundUser.password!, password)
    // if (!isPasswordValid) {
    //   return NextResponse.json(
    //     { message: 'Invalid credentials' },
    //     { status: 401, headers }
    //   )
    // }
    // console.log(isPasswordValid)

    const userId = foundUser.id.toString()
    const response = NextResponse.json(
      {
        message: 'Successfully logged in',
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
      secret
    )
    
    return sessionResponse

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}