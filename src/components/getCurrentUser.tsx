import { cookies } from 'next/headers';
import type { User } from '@prisma/client';
import { verifyJWT } from '@/lib/auth/jwt';
import prisma from '@/lib/db';

export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth')?.value;
    const secret = process.env.JWT_SECRET;

    if (!authToken || !secret) {
      return null;
    }

    const verified = await verifyJWT({
      token: authToken,
      secret
    });

    if (!verified?.userId) {
      return null;
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: +verified.userId }
    });
    return existingUser;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}
