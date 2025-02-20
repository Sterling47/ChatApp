import { NextResponse } from "next/server";
import { generateJWT, verifyJWT } from "./jwt";
import { randomUUID } from 'crypto';
import { generateCSRFToken } from "./csrf";
import * as jose from 'jose'
import { setCSRFToken } from "../utils";

export const createSession = async (
  response: NextResponse, 
  userId: string, 
  secret: string,
  isGuest: boolean = false
): Promise<NextResponse> => {
  const sessionId = randomUUID();
  const token = await generateJWT({
    payload: {
      sub: userId.toString(),
      jti: sessionId,         
      guest: isGuest,         
    },
    secret: secret,
    options: { expiresIn: '1h' }
  });
  const csrfToken = generateCSRFToken(sessionId, secret);
  setCSRFToken(csrfToken)
  response.headers.set('x-csrf-token', csrfToken)
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

export const getSession = async (token: string | undefined, secret: string): Promise<jose.JWTPayload | null> => {
  if (!token) {
    return null;
  }

  try {
    const verified = await verifyJWT({
      token: token,
      secret: secret
    });
    console.log(verified)
    return verified;
  } catch (error) {
    return null;
  }
};