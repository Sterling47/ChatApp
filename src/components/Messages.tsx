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
    const messageHandler = (text: string) => {
      setincomingMessages((prev) => [...prev, text])
    }
    pusherClient.bind('incoming-message', messageHandler)
    return () => {
      pusherClient.unbind('incoming-message', messageHandler)
      pusherClient.unsubscribe(`${RoomID}`)
      }
    }, [RoomID])

  return (
    <div>
      {(initialMessages?.length === 0 && incomingMessages.length === 0) ? <p>No messages found..</p> : initialMessages.map(({ text, id }) => {
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
