import dayjs from 'dayjs'
import { DailyCard } from './DailyCard'
import { useContext, useEffect, useMemo, useState } from 'react'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'
import { stringify } from 'yaml'
import { Box, Button, Stack } from '@mui/material'
import { WeekInterface } from './WeekSelector'
import { parseMin } from '../libs/utils'

const formatMin = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h${m.toString().padStart(2, '0')}m`
}

const UNCATEGORIZED = '(未分類)'

interface DayInWeek {
  year: number
  month: number
  day: number
  offset: number
  works: Work[]
}

interface WeeklyCardsProps {
  week: WeekInterface
}

export function WeeklyCards({ week }: Readonly<WeeklyCardsProps>) {
  const container = useContext(ContainerContext)
  const [days, setDays] = useState<DayInWeek[]>([])
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder<Work>>('recorder')
  }

  useEffect(() => {
    const load = async () => {
      const monday = dayjs()
        .year(week.year)
        .month(week.month - 1)
        .date(week.day)
      const list: DayInWeek[] = []
      for (let i = 0; i < 7; i++) {
        const d = monday.add(i, 'day')
        const works: Work[] = await recorder.listByDay(d.year(), d.month() + 1, d.date())
        const offset = new Date(d.year(), d.month(), 1).getDay()
        list.push({
          year: d.year(),
          month: d.month() + 1,
          day: d.date(),
          offset,
          works,
        })
      }
      setDays(list)
    }
    load()
  }, [week])

  const { totalMin, breakdown } = useMemo(() => {
    const perType = new Map<string, number>()
    let total = 0
    days.forEach((d) => {
      d.works.forEach((work) => {
        if (!work.start || !work.end) {
          return
        }
        const duration = parseMin(work.end) - parseMin(work.start)
        if (duration <= 0) {
          return
        }
        const key = work.type || UNCATEGORIZED
        perType.set(key, (perType.get(key) ?? 0) + duration)
        total += duration
      })
    })
    const items = Array.from(perType.entries())
      .map(([type, min]) => ({
        type,
        min,
        percent: total > 0 ? (min / total) * 100 : 0,
      }))
      .sort((a, b) => b.min - a.min)
    return { totalMin: total, breakdown: items }
  }, [days])

  const [copied, setCopied] = useState<string>('')
  const copy = () => {
    const yml: any = {}
    days.forEach((d) => {
      const dailyData: any[] = []
      d.works.forEach((datum) => {
        dailyData.push({
          s: datum.start,
          e: datum.end,
          i: datum.item,
          t: datum.type,
          c: datum.comment,
        })
      })
      const key = `_${d.year}_${d.month}_${d.day}`
      yml[key] = dailyData
    })
    if (navigator.clipboard) {
      navigator.clipboard.writeText(stringify(yml))
      setCopied('Copied!!')
      setTimeout(() => {
        setCopied('')
      }, 1500)
    }
  }

  const weekRange = useMemo(() => {
    if (days.length === 0) return ''
    const first = days[0]
    const last = days[days.length - 1]
    return `${first.year}/${first.month}/${first.day} - ${last.year}/${last.month}/${last.day}`
  }, [days])

  return (
    <>
      <Button sx={{ m: 1 }} size='small' variant='outlined' onClick={copy}>
        Copy
      </Button>
      {copied}
      <Box sx={{ mx: 1, my: 1, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
        <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>
          週合計 ({weekRange}): {formatMin(totalMin)}
        </Box>
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
      {days.map(({ year, month, day, offset, works }) => (
        <DailyCard
          key={`${year}-${month}-${day}`}
          year={year}
          month={month}
          day={day}
          works={works}
          offset={offset}
        />
      ))}
    </>
  )
}
