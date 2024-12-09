import React from 'react'
import Viewbox from '@/components/Viewbox'
import prisma from '@/lib/db'

interface RoomPageProps {
  params: {
    id: number
  }
}
export default async function RoomPage({params}:RoomPageProps) {
  const {id} = params
  const messages = await prisma.message.findMany({
    where: {
      roomID: id 
    }
  })
  
  return (
    <Viewbox messages={messages}/>
  )
}
