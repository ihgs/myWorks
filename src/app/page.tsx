import styles from './page.module.css'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from './libs/recorder/indexedDb'
import WorkCard from './components/WorkCard'
import { ContainerContext } from './libs/recorder/base'
import { DateSelector } from './components/DateSelector'
import WorkCards, { DateInterface } from './components/WorkCards'
import { useState } from 'react'
import dayjs from 'dayjs'


const today = dayjs()

export default function Home() {
  const container = createContainer()
  container.register({"recorder": asClass(IndexedDb).singleton()})

  const [targetDate, setTargetDate] = useState<DateInterface>({year: today.year(), month: today.month()+1, day: today.date()});

  const handleDateSlector = (slectedDate: DateInterface) =>{
    setTargetDate(slectedDate)
  }

  return (
    <main className={styles.main}>
      <ContainerContext.Provider value={container}>
          <DateSelector onChange={handleDateSlector}/>
          <WorkCards {...targetDate} />
      </ContainerContext.Provider>

    </main>
  )
}
