import '../globals.css'
import React from 'react'
import Nav from '@/components/Nav'

import prisma from '@/lib/db';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const room = await prisma.room.findMany()
  

  return (
      <div className='user-dash'>
        <Nav initialRooms={room} />
        {children}
      </div>
  )
}
