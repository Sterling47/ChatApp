import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import prisma from '@/lib/db';
import { sendMessage } from '../actions/actions';
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
    userData = await resp.json();
  }
  catch (err) {
    error = err instanceof Error ? err.message : 'Unexpected error occured'
  }

  return (
      <div className='user-dash'>
        <Nav rooms={room}  user={userData}/>
        {error && <p className='error-msg'>{error}</p>}
       
        {children}
       <div className='view-box'>
          <h1>ViewBox</h1>
        </div>
        <div className="form-wrapper">
          <form 
          // action={ async(formData: FormData) => {
          // await sendMessage(formData)
          // }}
          >
            <input type="text" name='message' />
            <button className='send-message-bttn'><img className='send-arrow-img' src="send.png" alt="" /></button>
          </form>
        </div>
      </div>

  )
}
