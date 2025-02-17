import { NextResponse, NextRequest } from "next/server";
import { generateJWT, verifyJWT } from "./jwt";
import { randomUUID } from 'crypto';

export const createSession = async (
  response: NextResponse, 
  userId: string, 
  secret: string
): Promise<NextResponse> => {
  const sessionId = randomUUID();
  const token = await generateJWT({
    payload: { userId, sessionId },
    secret: secret,
    options: { expiresIn: '1h' }
  });
  response.cookies.set({
    name: 'auth',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600,
    path: '/'
  });
  response.cookies.set({
    name: 'sessionId',
    value: sessionId,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600,
    path: '/'
  });

  return response;
};

export const endSession = (response: NextResponse): NextResponse => {
  response.cookies.set({
    name: 'auth',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0
  });

  response.cookies.set({
    name: 'sessionId',
    value: '',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0
  });

  return response;
};

export const getSession = async (request: NextRequest, secret: string) => {
  const token = request.cookies.get('auth')?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyJWT({
      token: token,
      secret: secret
    });
  } catch (error) {
    return null;
  }
};