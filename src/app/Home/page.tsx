// 'use client';

import '../globals.css'
import React from 'react'
// import { useEffect } from 'react';
import Nav from '@/components/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const {getUser} = getKindeServerSession();
  const user = getUser();
  if (!user) {
    redirect('http://localhost:3000')
  }
  await fetch('http://localhost:3000/api/seedUser',{
    method: 'POST',
  })
  // useEffect(() => {
  //   const seedUser = async () => {
  //     try {
  //       const response = await fetch('/api/seedUser', {
  //         method: 'POST',
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to seed user');
  //       }

  //       const user = await response.json();
  //       console.log('Seeded user:', user);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   seedUser();
  // }, []);

  return (
      <div className='user-dash'>
        <Nav/>

        <div className='view-box'>
          <h1>ViewBox</h1>
        </div>
        <div className="form-wrapper">
          <form action="">
            <input type="text" />
            <button className='send-message-bttn'><img className='send-arrow-img' src="send.png" alt="" /></button>
          </form>
        </div>
      </div>

  )
}

export default Home