import { Box, Button, Stack, TextField } from '@mui/material'
import WorkCard from '@/app/components/WorkCard'
import { useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { workListState } from '../libs/atoms/workList-state'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'

export interface DateInterface {
  year: number
  month: number
  day: number
}

export default function WorkCards({ year, month, day }: DateInterface) {
  const container = useContext(ContainerContext)
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder>('recorder')
  }

  const [data, setData] = useRecoilState<Work[]>(workListState)

  useEffect(() => {
    setData(recorder.listByDay(year, month, day))
  }, [])

  const add = () => {
    const last = data[data.length - 1]
    console.log(data)
    const newWork = { year, month, day, version: 0, start: last.end, id: -1 }
    setData(data.concat([newWork]))
  }

  return (
    <>
      {data.map((datum) => {
        return (
          <WorkCard
            key={datum.id}
            work={datum}
            edit={datum.start === undefined || datum.end === undefined}
          />
        )
      })}
      <Button size='large' variant='contained' onClick={add} sx={{ margin: 1 }}>
        +
      </Button>
    </>
  )
}
