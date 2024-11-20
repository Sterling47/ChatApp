import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'

const Home = () => {
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