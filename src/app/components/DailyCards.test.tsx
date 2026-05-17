import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DailyCards } from './DailyCards'
import { WithContainer, makeFakeRecorder } from '@/test/utils'

describe('DailyCards', () => {
  let recorder: ReturnType<typeof makeFakeRecorder>

  beforeEach(() => {
    recorder = makeFakeRecorder()
  })

  it('loads the month via recorder.listByMonth on mount', async () => {
    recorder.listByMonth.mockResolvedValue([])
    render(
      <WithContainer recorder={recorder}>
        <DailyCards month={{ year: 2024, month: 1 }} />
      </WithContainer>,
    )
    await waitFor(() => expect(recorder.listByMonth).toHaveBeenCalledWith(2024, 1))
  })

  it('renders one row per day of the month (January = 31)', async () => {
    recorder.listByMonth.mockResolvedValue([])
    render(
      <WithContainer recorder={recorder}>
        <DailyCards month={{ year: 2024, month: 1 }} />
      </WithContainer>,
    )
    // 31 days in January — last row contains "31 (水)" (2024-01-31)
    await waitFor(() => {
      expect(
        screen.getByText((_, el) => el?.textContent === '31 (水)'),
      ).toBeInTheDocument()
    })
  })

  it('renders Download and Upload buttons', async () => {
    recorder.listByMonth.mockResolvedValue([])
    render(
      <WithContainer recorder={recorder}>
        <DailyCards month={{ year: 2024, month: 1 }} />
      </WithContainer>,
    )
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument()
  })

  it('places loaded works on the correct day', async () => {
    recorder.listByMonth.mockResolvedValue([
      {
        id: 1,
        year: 2024,
        month: 1,
        day: 5,
        start: '09:00',
        end: '10:00',
        item: 'X',
        type: 'work',
        comment: '',
      },
    ])
    const user = userEvent.setup()
    render(
      <WithContainer recorder={recorder}>
        <DailyCards month={{ year: 2024, month: 1 }} />
      </WithContainer>,
    )
    await waitFor(() => expect(recorder.listByMonth).toHaveBeenCalled())
    // The day-5 row should show 1h
    expect(await screen.findByText('1 H')).toBeInTheDocument()
    // Show its work
    const showBtns = screen.getAllByRole('button', { name: 'Show' })
    await user.click(showBtns[0])
    expect(await screen.findByText('09:00 ~ 10:00')).toBeInTheDocument()
  })

  it('triggers download when Download is clicked', async () => {
    recorder.listByMonth.mockResolvedValue([])
    const createObjectURL = vi.fn(() => 'blob:fake')
    const revokeObjectURL = vi.fn()
    Object.assign(globalThis.URL, { createObjectURL, revokeObjectURL })

    const user = userEvent.setup()
    render(
      <WithContainer recorder={recorder}>
        <DailyCards month={{ year: 2024, month: 1 }} />
      </WithContainer>,
    )
    await waitFor(() => expect(recorder.listByMonth).toHaveBeenCalled())
    await user.click(screen.getByRole('button', { name: 'Download' }))
    expect(createObjectURL).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake')
  })
})
