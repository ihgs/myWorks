import { Box, Button, Card, Divider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ReactNode, useState } from 'react'
import WorkCard from './WorkCard'
import { useRouter } from 'next/navigation'
import { off } from 'process'

const dayOfWeek = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']

const whichDayOfWeek = (day: number, offset: number) => {
  return dayOfWeek[(day + offset - 1) % 7]
}
interface DailyCardProps {
  year: number
  month: number
  day: number
  offset: number
  works: Work[]
}

const parseMin = (hhmm?: string): number => {
  if (!hhmm) {
    return 0
  }
  const match = hhmm.match(/(\d+):(\d+)/)
  if (match) {
    const hour = match[1]
    const min = match[2]
    return parseInt(hour) * 60 + parseInt(min)
  }
  return 0
}

interface RateOfWork {
  sum: number
  works: Work[]
}

const putMap = (work: Work, map: Map<string, RateOfWork>) => {
  let type = work.type
  if (type === '') {
    type = '__non_type__'
  }
  if (type) {
    let rateOfWork = map.get(type)

    if (!rateOfWork) {
      rateOfWork = { sum: 0, works: [] }
      map.set(type, rateOfWork)
    }

    const end = parseMin(work.end)
    const start = parseMin(work.start)
    rateOfWork.sum = rateOfWork.sum + end - start
    rateOfWork.works.push(work)
    console.log(map)
  }
}
export function DailyCard({ year, month, day, offset, works }: DailyCardProps) {
  const [show, setShow] = useState<boolean>(false)
  const [showRate, setShowRate] = useState<boolean>(false)
  const router = useRouter()
  const rateMap = new Map<string, RateOfWork>()

  const renderWorks = () => {
    const workList: ReactNode[] = []
    works.forEach((work) => {
      workList.push(<WorkCard key={work.id} work={work} edit={false} onlyDisplay={true} />)
    })
    return workList
  }

  const renderRate = (sum: number) => {
    const workList: ReactNode[] = []
    let total = 0
    rateMap.forEach((value, key) => {
      let displayKey = key
      if (key === '__non_type__') {
        displayKey = '_'
      }
      const rate = Math.round((value.sum / sum) * 100)
      workList.push(
        <Grid container alignItems={'center'} columnSpacing={1} sx={{ wordWrap: 'break-word' }}>
          <Grid xs={2}>{displayKey}</Grid>
          <Grid xs={2}>{rate}</Grid>
        </Grid>,
      )
      total = total + rate
    })
    workList.push(<Divider />)
    workList.push(
      <Grid container alignItems={'center'} columnSpacing={1} sx={{ wordWrap: 'break-word' }}>
        <Grid xs={2}>合計</Grid>
        <Grid xs={2}>{total}</Grid>
      </Grid>,
    )
    return workList
  }

  let sum = 0
  works.forEach((work: Work) => {
    const end = parseMin(work.end)
    const start = parseMin(work.start)
    sum += end - start
    putMap(work, rateMap)
  })
  const sumH = sum / 60.0

  console.log(offset)

  return (
    <>
      <Grid container alignItems={'center'}>
        <Grid xs={2}>
          {day} {whichDayOfWeek(day, offset)}
        </Grid>
        <Grid xs={8}>{sumH} H</Grid>
        <Grid xs={2} spacing={2}>
          <Box display={'flex'} justifyContent={'flex-end'}>
            {sumH > 0 && (
              <>
                <Button
                  sx={{ m: 1 }}
                  variant='outlined'
                  onClick={() => {
                    setShow(!show)
                  }}
                  size={'small'}
                >
                  {show ? 'Hidden' : 'Show'}
                </Button>
                <Button
                  sx={{ m: 1 }}
                  variant='outlined'
                  onClick={() => {
                    setShowRate(!showRate)
                  }}
                  size={'small'}
                >
                  {showRate ? 'Hidden Rate' : 'Show Rate'}
                </Button>
              </>
            )}
            <Button
              sx={{ m: 1 }}
              variant='outlined'
              size={'small'}
              onClick={() => {
                router.push(`/?year=${year}&month=${month}&day=${day}`)
              }}
            >
              Go
            </Button>
          </Box>
        </Grid>
      </Grid>
      {show && <Card sx={{ marginLeft: 2 }}>{renderWorks()}</Card>}
      {showRate && <Card sx={{ marginLeft: 2 }}>{renderRate(sum)}</Card>}
      <Divider />
    </>
  )
}
