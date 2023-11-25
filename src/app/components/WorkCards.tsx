import { Button } from '@mui/material'
import WorkCard from '@/app/components/WorkCard'
import { useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { workListState } from '../libs/atoms/workList-state'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'
import { stringify } from 'yaml'

export interface DateInterface {
  year: number
  month: number
  day: number
}

let idCunter = 0

export default function WorkCards({ date }: { date: DateInterface }) {
  const container = useContext(ContainerContext)
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder>('recorder')
  }

  const [data, setData] = useRecoilState<Work[]>(workListState)
  const [copied, setCopied] = useState<string>('')

  const load = async () => {
    setData(await recorder.listByDay(date.year, date.month, date.day))
  }
  useEffect(() => {
    load()
  }, [date])

  const add = () => {
    const last = data[data.length - 1]
    const newWork = { ...date, version: 0, start: last?.end || '', id: --idCunter }
    setData(data.concat([newWork]))
  }

  const copy = () => {
    const yml: any[] = []
    data.forEach((datum) => {
      yml.push({
        s: datum.start,
        e: datum.end,
        i: datum.item,
        t: datum.type,
        c: datum.comment,
      })
    })
    if (navigator.clipboard) {
      navigator.clipboard.writeText(stringify(yml))
      setCopied('Copied!!')
      setTimeout(() => {
        setCopied('')
      }, 1500)
    }
  }
  return (
    <>
      <Button sx={{ m: 1 }} size='small' variant='outlined' onClick={copy}>
        Copy
      </Button>
      {copied}
      <div></div>
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
