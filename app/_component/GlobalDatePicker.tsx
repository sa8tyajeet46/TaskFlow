import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import {  CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import React, { Dispatch, SetStateAction } from 'react'

declare type GlobalDatePickerProps={
  date:Date | undefined,
  setDate:Dispatch<SetStateAction<Date | undefined>>
}
function GlobalDatePicker({date,setDate}:GlobalDatePickerProps) {
  // const [date, setDate] = React.useState<Date >()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className='bg-white rounded-md shadow-md'
        />
      </PopoverContent>
    </Popover>
  )
}

export default GlobalDatePicker