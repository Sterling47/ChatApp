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
    <div className="flex flex-col h-[80%] w-full space-y-4 overflow-y-auto" >
      {(initialMessages?.length === 0 && incomingMessages.length === 0) ? <p>No messages found..</p> : initialMessages.map(({ text, id, userID}) => {
        return (
          <div key={id} className={`flex w-full max-h-[80%]  ${creatorID === userID ? 'justify-end' : 'justify-start'}`}> 
            <MessageBubble direction={creatorID === userID? 'outgoing':'incoming' } >
                {text}
            </MessageBubble>
          </div>
        )
      })}
      {incomingMessages.map(({content,userID,timeStamp},i) => {
        return (
          <div key={i} className={`flex w-full ${creatorID === userID ? 'justify-end' : 'justify-start'}`}> 
            <MessageBubble direction={creatorID === userID? 'outgoing':'incoming' }>
                <p>{content}</p>
                <i className='text-[.5rem]'>{timeStamp}</i>
            </MessageBubble>
          </div>
        )
      })}
    </div>
  )
}
