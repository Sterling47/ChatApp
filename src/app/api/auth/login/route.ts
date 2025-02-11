// Rate limiting
// Email/password validation
// JWT generation
import { csrfProtectionMiddleware } from '@/lib/auth/csrf';
import { rateLimiter } from '@/lib/auth/rateLimit';
import { createSession } from '@/lib/auth/session';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import { verifyPassword } from '@/components/Password';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.JWT_SECRET!;
  await rateLimiter(req, res);
  csrfProtectionMiddleware(req, res, secret)
  const { email, password } = await req.body;
  const foundUser = await prisma.user.findUnique({
    where: {email: email}
  })
  if (foundUser) {
    const userId = foundUser.id.toString()
    const isPasswordValid = await verifyPassword(foundUser.password!, password);
    if (!isPasswordValid) {
      res.status(401).json({message: 'Incorrect Password'})
    }
    await createSession(res, userId, secret)
    res.status(200).json({message: 'Successfully logged in'})
  }
  else {
    res.status(405).json({message: ''})
  }

}
