import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkCard from './WorkCard'
import { WithRecoilAndContainer, makeFakeRecorder } from '@/test/utils'

describe('WorkCard', () => {
  let recorder: ReturnType<typeof makeFakeRecorder>

  beforeEach(() => {
    recorder = makeFakeRecorder()
    recorder.listTypes.mockResolvedValue([
      { id: 1, name: 'work', code: 'W' },
      { id: 2, name: 'meeting', code: 'M' },
    ])
  })

  const baseWork: Work = {
    id: 10,
    year: 2024,
    month: 1,
    day: 1,
    start: '09:00',
    end: '10:00',
    item: 'task A',
    type: 'work',
    comment: 'note',
    version: 1,
  }

  it('renders start/end/item/type in display mode', () => {
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} />
      </WithRecoilAndContainer>,
    )
    expect(screen.getByText('09:00 ~ 10:00')).toBeInTheDocument()
    expect(screen.getByText(/task A/)).toBeInTheDocument()
    expect(screen.getByText(/work/)).toBeInTheDocument()
  })

  it('toggles the comment area via Show / Hidden', async () => {
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} />
      </WithRecoilAndContainer>,
    )
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByRole('button', { name: 'Hidden' })).toBeInTheDocument()
    expect(screen.getByText('note')).toBeInTheDocument()
  })

  it('hides the Edit button when onlyDisplay is true', () => {
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} onlyDisplay />
      </WithRecoilAndContainer>,
    )
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
  })

  it('switches to edit form when Edit is clicked', async () => {
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} />
      </WithRecoilAndContainer>,
    )
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    expect(screen.getByLabelText('start')).toBeInTheDocument()
    expect(screen.getByLabelText('end')).toBeInTheDocument()
    expect(screen.getByLabelText('item')).toBeInTheDocument()
    expect(screen.getByLabelText('comment')).toBeInTheDocument()
  })

  it('starts in edit mode when edit prop is true', () => {
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} edit />
      </WithRecoilAndContainer>,
    )
    expect(screen.getByLabelText('start')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard
          work={{ year: 2024, month: 1, day: 1, version: 0 } as Work}
          edit
        />
      </WithRecoilAndContainer>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(await screen.findByText('時間を入力してください')).toBeInTheDocument()
    expect(await screen.findByText('項目を入力してください')).toBeInTheDocument()
    expect(recorder.save).not.toHaveBeenCalled()
  })

  it('saves and exits edit mode on Save submit', async () => {
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} edit />
      </WithRecoilAndContainer>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(recorder.save).toHaveBeenCalled())
    const savedWith = recorder.save.mock.calls[0][0]
    expect(savedWith).toMatchObject({
      start: '09:00',
      end: '10:00',
      item: 'task A',
      type: 'work',
    })
    // After save, display mode again
    expect(await screen.findByText('09:00 ~ 10:00')).toBeInTheDocument()
  })

  it('stays in edit mode when 途中保存 is clicked', async () => {
    const user = userEvent.setup()
    render(
      <WithRecoilAndContainer recorder={recorder}>
        <WorkCard work={baseWork} edit />
      </WithRecoilAndContainer>,
    )
    await user.click(screen.getByRole('button', { name: '途中保存' }))
    await waitFor(() => expect(recorder.save).toHaveBeenCalled())
    // Still in edit mode: start input is visible
    expect(screen.getByLabelText('start')).toBeInTheDocument()
  })
})
