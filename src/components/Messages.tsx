'use client'
import React, {useEffect, useState} from 'react'
import { pusherClient } from '@/lib/pusher-client'

interface MessageProps {
    RoomID: number,
    initialMessages: {
      text: string,
      id: number
    }[]
}

export const Messages: React.FC<MessageProps> = ({RoomID, initialMessages}) => {
  const [incomingMessages, setincomingMessages] = useState<string[]>([])
  useEffect(()=> {
    pusherClient.subscribe(`${RoomID}`)
    pusherClient.bind('incoming-message', (text: string) => {
      setincomingMessages((prev) => [...prev,text])
    })
    return () => {
      pusherClient.unsubscribe(`${RoomID}`)
    }
  }, [RoomID])

  return (
    <div>
      {initialMessages?.length === 0 ? <p>No messages found..</p> : initialMessages.map(({ text, id }) => {
        return (
        <div key={id}>
            <p>{text}</p>
        </div>)
      })}
      {incomingMessages.map((text, i) => {
        return (
        <div key={i}>
            <p>{text}</p>
        </div>)
      })}
    </div>
  )
}
