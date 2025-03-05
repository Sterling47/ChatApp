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
    const headers = limiter.checkNext(req, 25);
    const secret = process.env.JWT_SECRET!;
    const isGuestLogin = req.headers.get('x-login-type') === 'guest';
    
    const { userId, isGuest } = isGuestLogin 
      ? await handleGuestLogin()
      : await handleUserLogin(req);
    
    return await setupSession(userId, isGuest, secret, headers);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
};

async function handleGuestLogin(): Promise<{ userId: string; isGuest: boolean }> {
  const guestNanoid = nanoid(6);
  const guestUsername = `chatt-r_${guestNanoid}`;
  
  const newGuestUser = await prisma.user.create({
    data: {
      email: guestUsername,
      username: guestUsername,
      isGuest: true,
      password: null
    }
  });
  
  if (!newGuestUser) {
    throw new Error('Failed to create guest user');
  }
  
  return { 
    userId: newGuestUser.id.toString(),
    isGuest: true
  };
}

async function handleUserLogin(req: NextRequest): Promise<{ userId: string; isGuest: boolean }> {
  const body = await req.json();
  const { email, password } = body;
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const foundUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!foundUser) {
    const newUser = await prisma.user.create({
      data: {
        email,
        username: '',
        password
      }
    });
    
    return {
      userId: newUser.id.toString(),
      isGuest: false
    };
  }
  
  const isPasswordValid = await verifyPassword(foundUser.password!, password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  return {
    userId: foundUser.id.toString(),
    isGuest: false
  };
}

async function setupSession(userId: string, isGuest: boolean, 
  secret: string, headers: Headers): Promise<NextResponse> {
  const responseData = {
    message: isGuest ? 'Logged in as guest' : 'Successfully logged in',
    redirectUrl: '/Home'
  };
  const response = NextResponse.json(responseData, { status: 200, headers });
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
  
  return sessionResponse;
}