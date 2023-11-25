import { useState } from 'react'
import { DateSelector } from '../components/DateSelector'
import { MonthInterface, MonthSelector } from '../components/MonthSelector'

export default function MonthWorks() {
  const [targetMonth, setTargetMonth] = useState<MonthInterface>()

  const handleMonthSelector = (date: MonthInterface) => {
    setTargetMonth({ ...date })
  }
  return (
    <>
      <MonthSelector onChange={handleMonthSelector} />
    </>
  )
}
