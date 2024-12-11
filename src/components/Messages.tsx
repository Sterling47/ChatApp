'use client'
import React, {useEffect, useState} from 'react'
import { pusherClient } from '@/lib/pusher-client'
import type {Message} from '@prisma/client'

interface MessageProps {
    RoomID: number,
    initialMessages: Message[]
}

export const Messages: React.FC<MessageProps> = ({RoomID, initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages)
  useEffect(()=> {
    const channel = pusherClient.subscribe(`${RoomID}`)
    channel.bind('new-message', (data: { id: number; content: string; timeStamp: Date; userID: number; roomID: number }) => {
      setMessages(initialMessages => [...initialMessages,data])
    })
    return () => {
      pusherClient.unsubscribe(`${RoomID}`)
    }
  }, [RoomID])
  return (
    <div>
      {messages?.length === 0 ? <p>No messages found..</p> : messages.map(({ id, content, userID }) => {
        return (
        <div key={id}>
            <p>{content}</p>
        </div>)
      })}
    </div>
  )
}
