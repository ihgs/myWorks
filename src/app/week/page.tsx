'use client'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from '../libs/recorder/indexedDb'
import { ContainerContext } from '../libs/recorder/base'
import { WeekInterface, WeekSelector } from '../components/WeekSelector'
import { WeeklyCards } from '../components/WeeklyCards'

const today = dayjs()

const mondayOf = (date: Dayjs) => {
  const diff = (date.day() + 6) % 7
  return date.subtract(diff, 'day')
}

export default function WeekWorks() {
  const container = createContainer()
  container.register({ recorder: asClass(IndexedDb).singleton() })

  const initMonday = mondayOf(today)
  const [targetWeek, setTargetWeek] = useState<WeekInterface>({
    year: initMonday.year(),
    month: initMonday.month() + 1,
    day: initMonday.date(),
  })

  const handleWeekSelector = (week: WeekInterface) => {
    setTargetWeek({ ...week })
  }

  return (
    <>
      <ContainerContext.Provider value={container}>
        <WeekSelector onChange={handleWeekSelector} />
        <WeeklyCards week={targetWeek} />
      </ContainerContext.Provider>
    </>
  )
}
