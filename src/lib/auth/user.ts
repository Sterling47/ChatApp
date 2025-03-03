import { cookies } from 'next/headers';
import type { User } from '@prisma/client';
import { verifyJWT } from '@/lib/auth/jwt';
import prisma from '@/lib/db';
import { getSession } from "@/lib/auth/session";

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

    if (!verified?.sub) {
      return null;
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: +verified.sub }
    });
    return existingUser;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}



export const seedUser = async (token: string | undefined, secret: string):Promise<User|null> => {
  try {
    const userSession = await getSession(token, secret);
    const userId = userSession?.sub
    if (!userId) {
      throw new Error('No valid user session found');
    }
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL
    const resp = await fetch(`${baseURL}/api/seedUser`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({userId: userId})
    });
    if (!resp.ok){
      throw new Error ('Failed to seed user')
    }
    return await resp.json();
  }
  catch (err) {
   console.log(err)
   return null
  }
}
