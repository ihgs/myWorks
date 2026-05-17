import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WeeklyCards } from './WeeklyCards'
import { WithContainer, makeFakeRecorder } from '@/test/utils'

describe('WeeklyCards', () => {
  let recorder: ReturnType<typeof makeFakeRecorder>

  beforeEach(() => {
    recorder = makeFakeRecorder()
  })

  it('loads each of the 7 days via recorder.listByDay', async () => {
    recorder.listByDay.mockResolvedValue([])
    render(
      <WithContainer recorder={recorder}>
        <WeeklyCards week={{ year: 2024, month: 1, day: 1 }} />
      </WithContainer>,
    )
    await waitFor(() => expect(recorder.listByDay).toHaveBeenCalledTimes(7))
    expect(recorder.listByDay).toHaveBeenNthCalledWith(1, 2024, 1, 1)
    expect(recorder.listByDay).toHaveBeenNthCalledWith(7, 2024, 1, 7)
  })

  it('renders the week range and "記録なし" when no data', async () => {
    recorder.listByDay.mockResolvedValue([])
    render(
      <WithContainer recorder={recorder}>
        <WeeklyCards week={{ year: 2024, month: 1, day: 1 }} />
      </WithContainer>,
    )
    expect(await screen.findByText('週合計 (2024/1/1 - 2024/1/7): 0h00m')).toBeInTheDocument()
    expect(screen.getByText('記録なし')).toBeInTheDocument()
  })

  it('aggregates totals and breakdown across the week', async () => {
    recorder.listByDay.mockImplementation(async (_y: number, _m: number, day: number) => {
      if (day === 1) {
        return [
          {
            year: 2024,
            month: 1,
            day: 1,
            start: '09:00',
            end: '10:30',
            type: 'work',
          } as Work,
        ]
      }
      if (day === 3) {
        return [
          {
            year: 2024,
            month: 1,
            day: 3,
            start: '13:00',
            end: '14:00',
            type: '',
          } as Work,
        ]
      }
      return []
    })
    render(
      <WithContainer recorder={recorder}>
        <WeeklyCards week={{ year: 2024, month: 1, day: 1 }} />
      </WithContainer>,
    )
    // 1.5h + 1h = 2h30m
    expect(await screen.findByText(/週合計.*2h30m/)).toBeInTheDocument()
    expect(screen.getByText('work')).toBeInTheDocument()
    expect(screen.getByText('(未分類)')).toBeInTheDocument()
  })

  it('copies YAML to clipboard when Copy is clicked', async () => {
    recorder.listByDay.mockResolvedValue([])

    const user = userEvent.setup()
    render(
      <WithContainer recorder={recorder}>
        <WeeklyCards week={{ year: 2024, month: 1, day: 1 }} />
      </WithContainer>,
    )
    await waitFor(() => expect(recorder.listByDay).toHaveBeenCalledTimes(7))
    await screen.findByText(/週合計.*2024\/1\/7/)
    // spy on the actual clipboard.writeText that the component will call
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined)
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(await screen.findByText('Copied!!')).toBeInTheDocument()
    expect(writeText).toHaveBeenCalled()
    writeText.mockRestore()
  })
})
