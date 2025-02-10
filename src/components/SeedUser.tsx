'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';


export const SeedUser = async () => {
  try {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const baseURL = process.env.KINDE_SITE_URL
    const resp = await fetch(`${baseURL}/api/seedUser`,{
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
   return null
  }
}
