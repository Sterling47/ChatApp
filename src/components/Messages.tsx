'use client'
import React, {useEffect, useState} from 'react'
import { pusherClient } from '@/lib/pusher-client'
import { MessageBubble } from './MessageBubble'
interface MessageProps {
    RoomID: number,
    initialMessages: {
      text: string,
      id: number,
      userID: number 
    }[],
    creatorID: number | undefined
}
interface incomingMessageProps {
  content: string,
  userID: number | undefined,
  roomID: number | undefined,
  timeStamp: string
}

export const Messages: React.FC<MessageProps> = ({RoomID, initialMessages,creatorID}) => {
  const [incomingMessages, setincomingMessages] = useState<incomingMessageProps[]>([])
  useEffect(()=> {
    pusherClient.subscribe(`${RoomID}`)
    const messageHandler = (text: incomingMessageProps) => {
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
      {(initialMessages?.length === 0 && incomingMessages.length === 0) ? <p>No messages found..</p> : initialMessages.map(({ text, id, userID}) => {
        return (
        <MessageBubble direction={creatorID === userID? 'outgoing':'incoming' } key={id}>
            <p>{text}</p>
        </MessageBubble>)
      })}
      {incomingMessages.map(({content,userID,timeStamp},i) => {
        return (
        <MessageBubble direction={creatorID === userID? 'outgoing':'incoming' } key={i}>
            <p>{content}</p>
            <i className='text-[.5rem]'>{timeStamp}</i>
        </MessageBubble>)
      })}
    </div>
  )
}
