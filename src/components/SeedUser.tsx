'use server'
import { getSession } from "@/lib/auth/session";
import type { User } from "@prisma/client";


export const seedUser = async (token: string | undefined, secret: string):Promise<User|null> => {

  try {
    const userSession = await getSession(token, secret);
    
    if (!userSession?.userId) {
      throw new Error('No valid user session found');
    }
    const baseURL = process.env.KINDE_SITE_URL
    const resp = await fetch(`${baseURL}/api/seedUser`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({userId: userSession.userId})
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
