import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/db';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {getUser} = getKindeServerSession();
  const room = await prisma.room.findMany()

  let error, userData = null;
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
    if (!user) {
      return {
        notFound: true
      }
    }
    userData = await resp.json();
  }
  catch (err) {
    error = err instanceof Error ? err.message : 'Unexpected error occured'
  }

  return (
      <div className='user-dash'>
        <Nav initialRooms={room}  user={userData}/>
        {error && <p className='error-msg'>{error}</p>}
       
        {children}

      </div>

  )
}
