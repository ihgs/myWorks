import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkCards from './WorkCards'
import { WithRecoilAndContainer, makeFakeRecorder } from '@/test/utils'

describe('WorkCards', () => {
  let recorder: ReturnType<typeof makeFakeRecorder>

  beforeEach(() => {
    recorder = makeFakeRecorder()
    recorder.listTypes.mockResolvedValue([])
  })

  it('loads works for the given day on mount', async () => {
    recorder.listByDay.mockResolvedValue([])
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCards date={{ year: 2024, month: 2, day: 3 }} />
      </WithRecoilAndContainer>,
    )
    await waitFor(() => expect(recorder.listByDay).toHaveBeenCalledWith(2024, 2, 3))
  })

  it('renders the total and breakdown when works exist', async () => {
    recorder.listByDay.mockResolvedValue([
      {
        id: 1,
        year: 2024,
        month: 2,
        day: 3,
        start: '09:00',
        end: '10:30',
        item: 'A',
        type: 'work',
        comment: '',
        version: 1,
      },
      {
        id: 2,
        year: 2024,
        month: 2,
        day: 3,
        start: '11:00',
        end: '12:00',
        item: 'B',
        type: '',
        comment: '',
        version: 1,
      },
    ])
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCards date={{ year: 2024, month: 2, day: 3 }} />
      </WithRecoilAndContainer>,
    )
    expect(await screen.findByText('合計: 2h30m')).toBeInTheDocument()
    // "work" appears in both the WorkCard row and the breakdown — just confirm presence
    expect(screen.getAllByText('work').length).toBeGreaterThan(0)
    expect(screen.getByText('(未分類)')).toBeInTheDocument()
  })

  it('adds a new editable card when + is clicked', async () => {
    recorder.listByDay.mockResolvedValue([])
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCards date={{ year: 2024, month: 2, day: 3 }} />
      </WithRecoilAndContainer>,
    )
    await waitFor(() => expect(recorder.listByDay).toHaveBeenCalled())
    await user.click(screen.getByRole('button', { name: '+' }))
    // A new card in edit mode shows start input
    expect(await screen.findByLabelText('start')).toBeInTheDocument()
  })

  it('copies YAML to clipboard on Copy', async () => {
    recorder.listByDay.mockResolvedValue([])
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined)

    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCards date={{ year: 2024, month: 2, day: 3 }} />
      </WithRecoilAndContainer>,
    )
    await waitFor(() => expect(recorder.listByDay).toHaveBeenCalled())
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeText).toHaveBeenCalled()
    expect(await screen.findByText('Copied!!')).toBeInTheDocument()
    writeText.mockRestore()
  })

  it('shows "記録なし" when no data', async () => {
    recorder.listByDay.mockResolvedValue([])
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCards date={{ year: 2024, month: 2, day: 3 }} />
      </WithRecoilAndContainer>,
    )
    expect(await screen.findByText('記録なし')).toBeInTheDocument()
  })
})
