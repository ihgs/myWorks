import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export interface WeekInterface {
  year: number
  month: number
  day: number
}

interface WeekSelectorProps {
  year?: number
  month?: number
  day?: number
  onChange: (week: WeekInterface) => void
}

const today = dayjs()

const mondayOf = (date: Dayjs) => {
  const diff = (date.day() + 6) % 7
  return date.subtract(diff, 'day')
}

export function WeekSelector({
  year = today.year(),
  month = today.month() + 1,
  day = today.date(),
  onChange,
}: WeekSelectorProps) {
  const handleChange = (newValue: any) => {
    if (!newValue) return
    const monday = mondayOf(newValue)
    onChange({
      year: monday.year(),
      month: monday.month() + 1,
      day: monday.date(),
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ja'}>
      <DesktopDatePicker
        defaultValue={dayjs()
          .year(year)
          .month(month - 1)
          .date(day)}
        format='YYYY/MM/DD'
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}
