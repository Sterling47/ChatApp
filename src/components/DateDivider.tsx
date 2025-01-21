import {format, isToday, parseISO} from 'date-fns'

export const DateDivider = ({ date }: {date: string}) => {
  const messageDate = parseISO(date);
  const displayDate = isToday(messageDate) ? 'Today' : format(messageDate, 'MMMM d, yyyy')

  return (
    <div className="flex items-center justify-center w-full my-4">
      <div className="px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
        {displayDate}
      </div>
  </div>
  )
}