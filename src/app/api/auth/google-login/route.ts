import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'next-rate-limit';
import { createSession } from '@/lib/auth/session';
import { generateCSRFToken } from '@/lib/auth/csrf';
import { nanoid } from 'nanoid';
const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 100
})
async function verifyGoogleToken(token: string) {
  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to verify Google token');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw error;
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const headers = limiter.checkNext(req, 5);
    const secret = process.env.JWT_SECRET!;
    const body = await req.json();
    const { idToken } = body;
    
    if (!idToken) {
      return NextResponse.json(
        { message: 'Google ID token is required' },
        { status: 400, headers }
      );
    }
    
    const googleUser = await verifyGoogleToken(idToken);
    let foundUser = await prisma.user.findUnique({
      where: {
        email: googleUser.email
      }
    });
    
    if (!foundUser) {
      foundUser = await prisma.user.create({
        data: {
          email: googleUser.email,
          username: googleUser.name || `user_${nanoid(6)}`,
          isGuest: false,
          password: null,
          googleId: googleUser.sub,
          profilePicture: googleUser.picture || null
        }
      });
      
      if (!foundUser) {
        return NextResponse.json(
          { message: 'Failed to create user from Google account' },
          { status: 401, headers }
        );
      }
    } 

    else if (!foundUser.googleId) {
      foundUser = await prisma.user.update({
        where: { id: foundUser.id },
        data: { 
          googleId: googleUser.sub,
          profilePicture: googleUser.picture || foundUser.profilePicture
        }
      });
    }
    const userId = foundUser.id.toString();
    const response = NextResponse.json(
      {
        message: 'Successfully logged in with Google',
        redirectUrl: '/Home'
      },
      {
        status: 200,
        headers
      }
    );
    
    const sessionResponse = await createSession(response, userId, secret);
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
    return sessionResponse;

  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during Google login' },
      { status: 500 }
    );
  }
};