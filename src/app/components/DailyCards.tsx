import dayjs from 'dayjs'
import { DailyCard } from './DailyCard'

export interface DailyCardsProps {
  year: number
  month: number
  works: Work[]
}

export function DailyCards({ year, month, works }: DailyCardsProps) {
  const initArray = (): Work[][] => {
    const dates: Work[][] = []
    const lastDate = dayjs()
      .year(year)
      .month(month - 1)
      .date(1)
      .endOf('month')
    for (let i = 0; i < lastDate.date(); i++) {
      dates[i] = []
    }
    return dates
  }
  const dates = initArray()
  works.forEach((work) => {
    dates[work.day + 1].push(work)
  })
  return (
    <>
      {dates.map((dateData, index) => {
        return <DailyCard key={`${year}-${index}`} day={index + 1} works={dateData} />
      })}
    </>
  )
}
