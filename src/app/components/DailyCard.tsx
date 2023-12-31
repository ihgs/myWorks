import { Box, Button, Card, Divider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ReactNode, useState } from 'react'
import WorkCard from './WorkCard'
import { useRouter } from 'next/navigation'

interface DailyCardProps {
  year: number
  month: number
  day: number
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

export function DailyCard({ year, month, day, works }: DailyCardProps) {
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()
  const renderWorks = () => {
    const workList: ReactNode[] = []
    works.forEach((work) => {
      workList.push(<WorkCard key={work.id} work={work} edit={false} onlyDisplay={true} />)
    })
    return workList
  }

  let sum = 0
  works.forEach((work: Work) => {
    const end = parseMin(work.end)
    const start = parseMin(work.start)
    sum += end - start
  })
  const sumH = sum / 60.0

  return (
    <>
      <Grid container alignItems={'center'}>
        <Grid xs={2}>{day}</Grid>
        <Grid xs={8}>{sumH} H</Grid>
        <Grid xs={2} spacing={2}>
          <Box display={'flex'} justifyContent={'flex-end'}>
            {sumH > 0 && (
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
      <Divider />
    </>
  )
}
