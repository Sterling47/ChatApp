import React from 'react'
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import type {User} from '@prisma/client'

interface SeedUser {
  getUser: () => Promise<KindeUser | null>;
}
export const SeedUser = async ({getUser}:SeedUser): Promise<User | undefined> => {
  try {
    const user = await getUser();
    const resp = await fetch('http://localhost:3000/api/seedUser',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({user})
    });
    if (!resp.ok){
      throw new Error ('Failed to seed user')
    }
    return await resp.json();
  }
  catch (err) {
   console.log(err)
  }
}
