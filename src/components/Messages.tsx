'use client'
import React, {useEffect, useState} from 'react'
import { format } from 'date-fns'
import { pusherClient } from '@/lib/pusher-client'
import { MessageBubble } from './MessageBubble'
import { DateDivider } from './DateDivider'
import { useMessageStore } from '@/stores/messageStore'
interface MessageProps {
    RoomID: number,
    initialMessages: {
      content: string,
      id: number,
      userID: number,
      timeStamp: Date
    }[],
    creatorID: number | undefined
}
interface incomingMessageProps {
  content: string,
  userID: number | undefined,
  roomID: number | undefined,
  timeStamp: Date,
  id: number
}

export const Messages: React.FC<MessageProps> = ({RoomID, initialMessages,creatorID}) => {
  const { messages, addMessage } = useMessageStore();
  const roomMessages = messages[RoomID] || [];
  const allMessages = [...initialMessages, ...roomMessages];
  useEffect(()=> {
    pusherClient.subscribe(`${RoomID}`)
    const messageHandler = (text: incomingMessageProps) => {
      addMessage(RoomID, text)
    }
    pusherClient.bind('incoming-message', messageHandler)
    return () => {
      pusherClient.unbind('incoming-message', messageHandler)
      pusherClient.unsubscribe(`${RoomID}`)
      }
    }, [RoomID, addMessage])

  const processMessages = () => {
    if (allMessages.length === 0) {
      return null;
    }

    const groups: Record<string, typeof allMessages> = {};
    allMessages.forEach(message => {
      const date = new Date(message.timeStamp);
      const dateKey = format(date, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message)
    })

    return Object.entries(groups).sort(([a],[b]) => new Date(b).getTime() - new Date(a).getTime())
  }
  const groupedMessages = processMessages();

  if (!groupedMessages) {
    return <p>No messages found..</p>;
  }


return (
    <div className="flex flex-col-reverse h-[80%] w-full overflow-y-auto">
      <div className="flex flex-col-reverse space-y-reverse space-y-4 h-full">
        {groupedMessages.map(([date, messages]) => (
          <div key={date} className="flex flex-col">
            <DateDivider date={date} />
            {messages
            .sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime())
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${
                    creatorID === message.userID ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <MessageBubble
                    direction={creatorID === message.userID ? 'outgoing' : 'incoming'}
                  >
                    <p>{message.content}</p>
                    <i className="text-[.5rem]">
                      {format(new Date(message.timeStamp), 'h:mm a')}
                    </i>
                  </MessageBubble>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
