import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const Home = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  return (
      <div className='user-dash'>
        <Nav/>

        <div className='view-box'>
          <h1>ViewBox</h1>
        </div>
        <div className="form-wrapper">
          <form action="">
            <input type="text" />
          </form>
        </div>
      </div>

  )
}

export default Home