import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'next-rate-limit';
import { createSession } from '@/lib/auth/session';
import { generateCSRFToken } from '@/lib/auth/csrf';
import { nanoid } from 'nanoid';
import { verifyPassword } from '@/lib/auth/password';

const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 100
})

export const POST = async (req: NextRequest) => {
  try {
    const headers = limiter.checkNext(req, 25)
    const secret = process.env.JWT_SECRET!
    let userId: string;
    let isGuest: boolean = false;
    const isGuestLogin = req.headers.get('x-login-type') === 'guest';
    if (isGuestLogin) {
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
      userId = newGuestUser.id.toString();
      isGuest = true;
    }
    else {
      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { message: 'Email and password are required' },
          { status: 400, headers }
        );
      }

      const foundUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!foundUser) {
        const newUser = await prisma.user.create({
          data: {
            email: email ?? '',
            username: '',
            password: password ?? ''
          }
        })
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
        const userId = newUser.id.toString()
        const sessionResponse = await createSession(response, userId, secret, isGuest);
        const sessionId = sessionResponse.cookies.get('sessionId')?.value;
        if (!sessionId) {
          throw new Error('Failed to create session');
        }
        const csrfToken = generateCSRFToken(secret, sessionId);
        sessionResponse.headers.set('x-csrf-token', csrfToken);
        sessionResponse.cookies.set('csrfToken', csrfToken, {
          httpOnly: false,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        return sessionResponse
      }

      const isPasswordValid = await verifyPassword(foundUser.password!, password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401, headers }
        )
      }
      userId = foundUser.id.toString();
    }

    const response = NextResponse.json(
      {
        message: isGuest ? 'Logged in as guest' : 'Successfully logged in',
        redirectUrl: '/Home'
      },
      {
        status: 200,
        headers
      }
    );

    const sessionResponse = await createSession(response, userId, secret, isGuest);
    const sessionId = sessionResponse.cookies.get('sessionId')?.value;

    if (!sessionId) {
      throw new Error('Failed to create session');
    }
    const csrfToken = generateCSRFToken(secret, sessionId);
    sessionResponse.headers.set('x-csrf-token', csrfToken);
    sessionResponse.cookies.set('csrfToken', csrfToken, {
      httpOnly: false,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return sessionResponse

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}