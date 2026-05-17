import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DailyCard } from './DailyCard'

const works: Work[] = [
  {
    id: 1,
    year: 2024,
    month: 1,
    day: 3,
    start: '09:00',
    end: '10:30',
    item: 'A',
    type: 'work',
    comment: '',
  },
  {
    id: 2,
    year: 2024,
    month: 1,
    day: 3,
    start: '10:30',
    end: '12:00',
    item: 'B',
    type: 'meeting',
    comment: '',
  },
]

describe('DailyCard', () => {
  it('renders the day number and the day-of-week label', () => {
    // 2024-01-03 is Wed. offset = getDay(2024-01-01) = Mon = 1. day=3 + offset=1 -> idx (3+1-1)%7 = 3 => 水
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={works} />)
    expect(screen.getByText((_, el) => el?.textContent === '3 (水)')).toBeInTheDocument()
  })

  it('shows the total hours (sum of work durations)', () => {
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={works} />)
    // 1.5h + 1.5h = 3h
    expect(screen.getByText('3 H')).toBeInTheDocument()
  })

  it('shows the Go link with year/month/day query', () => {
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={works} />)
    const goLink = screen.getByRole('link', { name: 'Go' })
    expect(goLink.getAttribute('href')).toContain('year=2024')
    expect(goLink.getAttribute('href')).toContain('month=1')
    expect(goLink.getAttribute('href')).toContain('day=3')
  })

  it('does not show Show / Show Rate buttons when there are no works', () => {
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={[]} />)
    expect(screen.queryByRole('button', { name: 'Show' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Show Rate' })).not.toBeInTheDocument()
    expect(screen.getByText('0 H')).toBeInTheDocument()
  })

  it('toggles the work list when Show is clicked', async () => {
    const user = userEvent.setup()
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={works} />)
    const toggle = screen.getByRole('button', { name: 'Show' })
    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Hidden' })).toBeInTheDocument()
    expect(screen.getByText('09:00 ~ 10:30')).toBeInTheDocument()
    expect(screen.getByText('10:30 ~ 12:00')).toBeInTheDocument()
  })

  it('toggles the rate breakdown when Show Rate is clicked', async () => {
    const user = userEvent.setup()
    render(<DailyCard year={2024} month={1} day={3} offset={1} works={works} />)
    await user.click(screen.getByRole('button', { name: 'Show Rate' }))
    expect(screen.getByRole('button', { name: 'Hidden Rate' })).toBeInTheDocument()
    expect(screen.getByText('work')).toBeInTheDocument()
    expect(screen.getByText('meeting')).toBeInTheDocument()
    expect(screen.getByText('合計')).toBeInTheDocument()
  })
})
