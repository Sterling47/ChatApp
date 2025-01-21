type BubbleProps = {
  children: React.ReactNode
  direction: "outgoing" | "incoming"
}

export const MessageBubble = ({children,direction = 'outgoing'}:BubbleProps) => {
  const bubbleClass = `min-w-[120px] w-fit max-w-[300px] mx-[30px] mb-6 px-4 py-[1.1rem] relative text-white  rounded-md border-bubble backdrop:blur-md shadow-bubble
       before:absolute before:w-0 before:h-0
      before:border-l-[12px] before:border-l-transparent
      before:border-r-[12px] before:border-r-transparent
      before:border-t-[12px] 
      before:bottom-[-12px]
      before:transform-none`
  const directionClass = {
    outgoing: 'before:right-6 before:border-t-accent bg-accent',
    incoming: 'before:border-t-bg_bubble before:left-6 bg-bg_bubble '
  }
  return (
    <div className={`${bubbleClass} ${directionClass[direction]}`}>
      {children}
    </div>
  )
}
