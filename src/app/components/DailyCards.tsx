import dayjs from 'dayjs'
import { DailyCard } from './DailyCard'
import { MonthInterface } from './MonthSelector'
import { useContext, useEffect, useState } from 'react'
import { db } from '../libs/db'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'

export interface DailyCardsProps {
  month: MonthInterface
}

export function DailyCards({ month }: DailyCardsProps) {
  const container = useContext(ContainerContext)
  const [dates, setDates] = useState<Work[][]>([])
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder>('recorder')
  }
  useEffect(() => {
    const initArray = async () => {
      const dates: Work[][] = []
      const lastDate = dayjs()
        .year(month.year)
        .month(month.month - 1)
        .date(1)
        .endOf('month')
      for (let i = 0; i < lastDate.date(); i++) {
        dates[i] = []
      }

      const works = await recorder.listByMonth(month.year, month.month)

      works.forEach((work: any) => {
        dates[work.day - 1].push(work)
      })
      setDates(dates)
    }
    initArray()
  }, [month])

  return (
    <>
      {dates.map((dateData, index) => {
        return <DailyCard key={`${month.year}-${index}`} day={index + 1} works={dateData} />
      })}
    </>
  )
}
