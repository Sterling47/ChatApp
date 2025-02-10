import { NextApiRequest, NextApiResponse } from "next";
import { generateJWT, verifyJWT } from "./jwt";
import { serialize } from "cookie";

interface createSessionProps {
  res: NextApiResponse
  userId: string,
  secret: string
}

export const createSession = async ({res, userId, secret}:createSessionProps) => {
  const token = await generateJWT({
    payload: {userId},
    secret: secret,
    options: { expiresIn: '1h' }
  });
  res.setHeader('Set-Cookie', serialize('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  }));
};

export const endSession = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  }));
};

export const getSession = async (req: NextApiRequest, secret: string) => {
  const token = req.cookies.auth;
  if (!token) {
    return null;
  }
  return await verifyJWT({
    token: token,
    secret: secret
  });
}