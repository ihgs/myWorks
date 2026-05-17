import dayjs from 'dayjs'
import { DailyCard } from './DailyCard'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'
import { parse, stringify } from 'yaml'
import { Button } from '@mui/material'
import { DailyCardsProps } from '../types'

export function DailyCards({ month }: Readonly<DailyCardsProps>) {
  const container = useContext(ContainerContext)
  const [dates, setDates] = useState<Work[][]>([])
  const [message, setMessage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder<Work>>('recorder')
  }

  const loadMonth = async () => {
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

  useEffect(() => {
    loadMonth()
  }, [month])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  const buildYaml = () => {
    const yml: any = {}
    dates.forEach((data, index) => {
      if (data.length === 0) return
      const dailyDate: any[] = []
      data.forEach((datum) => {
        dailyDate.push({
          s: datum.start,
          e: datum.end,
          i: datum.item,
          t: datum.type,
          c: datum.comment,
        })
      })
      const key = `_${month.year}_${month.month}_${index + 1}`
      yml[key] = dailyDate
    })
    return stringify(yml)
  }

  const download = () => {
    const content = buildYaml()
    const blob = new Blob([content], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `works_${month.year}_${String(month.month).padStart(2, '0')}.yml`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = window.confirm(
      `${file.name} を読み込んで復元します。YAML に含まれる日の既存データは置き換えられます。続行しますか？`,
    )
    if (!ok) {
      e.target.value = ''
      return
    }
    try {
      const text = await file.text()
      const data: any = parse(text)
      if (!data || typeof data !== 'object') {
        throw new Error('YAML の形式が不正です')
      }
      let added = 0
      let replacedDays = 0
      for (const key of Object.keys(data)) {
        const match = key.match(/^_(\d+)_(\d+)_(\d+)$/)
        if (!match) continue
        const year = parseInt(match[1], 10)
        const m = parseInt(match[2], 10)
        const day = parseInt(match[3], 10)
        const entries = data[key]
        if (!Array.isArray(entries)) continue

        const existing: Work[] = await recorder.listByDay(year, m, day)
        for (const work of existing) {
          if (work.id != null) {
            await recorder.delete(work.id)
          }
        }
        replacedDays++

        for (const entry of entries) {
          if (!entry) continue
          const work: Work = {
            year,
            month: m,
            day,
            start: entry.s ?? '',
            end: entry.e ?? '',
            item: entry.i ?? '',
            type: entry.t ?? '',
            comment: entry.c ?? '',
          }
          await recorder.save(work)
          added++
        }
      }
      await loadMonth()
      showMessage(`${replacedDays} 日分を置き換え、${added} 件を復元しました`)
    } catch (err: any) {
      showMessage(`読み込み失敗: ${err?.message ?? 'unknown error'}`)
    } finally {
      e.target.value = ''
    }
  }

  const offset = new Date(month.year, month.month - 1, 1).getDay()

  return (
    <>
      <Button sx={{ m: 1 }} size='small' variant='outlined' onClick={download}>
        Download
      </Button>
      <Button sx={{ m: 1 }} size='small' variant='outlined' onClick={handleUploadClick}>
        Upload
      </Button>
      <input
        ref={fileInputRef}
        type='file'
        accept='.yml,.yaml,text/yaml,text/plain'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {message}
      <div></div>
      {dates.map((dateData, index) => {
        return (
          <DailyCard
            key={`${month.year}-${index}`}
            year={month.year}
            month={month.month}
            day={index + 1}
            works={dateData}
            offset={offset}
          />
        )
      })}
    </>
  )
}
