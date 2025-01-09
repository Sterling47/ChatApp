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
      <div className='grid h-screen grid-cols-9 grid-rows-12 p-0.25'>
        <Nav initialRooms={room} />
        {children}
      </div>
  )
}
