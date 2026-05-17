import { Box, Button, Stack } from '@mui/material'
import WorkCard from '@/app/components/WorkCard'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { workListState } from '../libs/atoms/workList-state'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'
import { stringify } from 'yaml'
import { DailyCard } from './DailyCard'
import { DateInterface } from '../types'
import { parseMin } from '../libs/utils'

const formatMin = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h${m.toString().padStart(2, '0')}m`
}

const UNCATEGORIZED = '(未分類)'

let idCunter = 0

export default function WorkCards({ date }: { date: DateInterface }) {
  const container = useContext(ContainerContext)
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder<Work>>('recorder')
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
    let nextStart = last?.end || ''
    if (nextStart == '12:00') {
      nextStart = '13:00'
    }
    const newWork = { ...date, version: 0, start: nextStart, id: --idCunter }
    setData(data.concat([newWork]))
  }

  const { totalMin, breakdown } = useMemo(() => {
    const perType = new Map<string, number>()
    let total = 0
    data.forEach((datum) => {
      if (!datum.start || !datum.end) {
        return
      }
      const duration = parseMin(datum.end) - parseMin(datum.start)
      if (duration <= 0) {
        return
      }
      const key = datum.type || UNCATEGORIZED
      perType.set(key, (perType.get(key) ?? 0) + duration)
      total += duration
    })
    const items = Array.from(perType.entries())
      .map(([type, min]) => ({
        type,
        min,
        percent: total > 0 ? (min / total) * 100 : 0,
      }))
      .sort((a, b) => b.min - a.min)
    return { totalMin: total, breakdown: items }
  }, [data])

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
      <Box sx={{ mx: 1, my: 1, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
        <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>合計: {formatMin(totalMin)}</Box>
        {breakdown.length === 0 ? (
          <Box sx={{ color: 'text.secondary' }}>記録なし</Box>
        ) : (
          <Stack spacing={0.25}>
            {breakdown.map(({ type, min, percent }) => (
              <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{type}</span>
                <span>
                  {formatMin(min)} ({percent.toFixed(1)}%)
                </span>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
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
