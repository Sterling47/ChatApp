import { generateJWT } from './jwt';
import prisma from '../db';
import {nanoid} from 'nanoid'
import { randomUUID } from 'crypto';
export async function guestAuth() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error ('Secret missing')
  }
  const guestUsername = `chatt-r_${nanoid(6)}`
  const sessionId = randomUUID();
  const newGuestUser = await prisma.user.create({
    data: {
      email: '',
      username: guestUsername,
      isGuest: true,
      password: null
    }
  })
  const token = await generateJWT({
    payload: { userId:newGuestUser.id, sessionId:sessionId },
    secret: secret,
    options: { expiresIn: '1h' }
  });
  return { user: newGuestUser, token }
}
