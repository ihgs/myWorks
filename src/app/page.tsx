'use client'

import styles from './page.module.css'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from './libs/recorder/indexedDb'
import WorkCard from './components/WorkCard'
import { ContainerContext } from './libs/recorder/base'

export default function Home() {
  const container = createContainer()
  container.register({"recorder": asClass(IndexedDb).singleton()})

  return (
    <main className={styles.main}>
      <ContainerContext.Provider value={container}>
          <WorkCard work={{year: 3, month: 2, day:1, version:0}} edit={true} />
      </ContainerContext.Provider>

    </main>
  )
}
