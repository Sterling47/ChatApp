import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import CreateRoom from '@/components/CreateRoom';
import prisma from '@/lib/db';

const Home = async () => {
  const {getUser} = getKindeServerSession();
  const room = await prisma.room.findMany()
  console.log('room:', room)

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
        <div className='view-box'>
          <h1>ViewBox</h1>
        </div>
        <div className="form-wrapper">
          <form action="">
            <input type="text" />
            <button className='send-message-bttn'><img className='send-arrow-img' src="send.png" alt="" /></button>
          </form>
        </div>
        {userData != null && <CreateRoom user={userData}/>}
      </div>

  )
}

export default Home