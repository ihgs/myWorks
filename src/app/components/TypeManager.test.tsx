import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TypeManager } from './TypeManager'
import { WithContainer, makeFakeRecorder } from '@/test/utils'

describe('TypeManager', () => {
  let recorder: ReturnType<typeof makeFakeRecorder>

  beforeEach(() => {
    recorder = makeFakeRecorder()
  })

  it('loads and renders types from recorder.list on mount', async () => {
    recorder.list.mockResolvedValue([
      { id: 1, name: 'work', code: 'W' },
      { id: 2, name: 'meeting', code: 'M' },
    ])
    render(
      <WithContainer recorder={recorder}>
        <TypeManager />
      </WithContainer>,
    )
    expect(recorder.list).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('work')).toBeInTheDocument()
    expect(await screen.findByText('meeting')).toBeInTheDocument()
  })

  it('saves a new type and clears inputs', async () => {
    recorder.list.mockResolvedValue([])
    const user = userEvent.setup()
    render(
      <WithContainer recorder={recorder}>
        <TypeManager />
      </WithContainer>,
    )

    const nameInput = screen.getByPlaceholderText('name') as HTMLInputElement
    const codeInput = screen.getByPlaceholderText('code') as HTMLInputElement
    await user.type(nameInput, 'study')
    await user.type(codeInput, 'S')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => {
      expect(recorder.save).toHaveBeenCalledWith({ name: 'study', code: 'S' })
    })
    expect(nameInput.value).toBe('')
    expect(codeInput.value).toBe('')
    // list is reloaded after save
    expect(recorder.list).toHaveBeenCalledTimes(2)
  })

  it('deletes a type when Delete button is clicked', async () => {
    recorder.list.mockResolvedValue([{ id: 5, name: 'tmp', code: 'T' }])
    const user = userEvent.setup()
    render(
      <WithContainer recorder={recorder}>
        <TypeManager />
      </WithContainer>,
    )

    const deleteBtn = await screen.findByRole('button', { name: 'Delete' })
    await user.click(deleteBtn)
    await waitFor(() => {
      expect(recorder.delete).toHaveBeenCalledWith(5)
    })
    expect(recorder.list).toHaveBeenCalledTimes(2)
  })
})
