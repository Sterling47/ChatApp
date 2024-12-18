import React from 'react'
interface SeedUser {
  getUser: Function
}
export const SeedUser:React.FC<SeedUser> = async ({getUser}) => {
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
