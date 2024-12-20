'use server'
import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import type {User} from '@prisma/client'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';


export const SeedUser = async () => {
  try {
    const {getUser} = getKindeServerSession();
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
