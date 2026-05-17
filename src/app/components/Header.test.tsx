import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

describe('Header', () => {
  it('renders Home / Week / Month / Type links', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Type' })).toBeInTheDocument()
  })

  it.each([
    ['Home', '/'],
    ['Week', '/week'],
    ['Month', '/month'],
    ['Type', '/type'],
  ])('navigates to %s -> %s on click', async (label, path) => {
    pushMock.mockClear()
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByRole('button', { name: label }))
    expect(pushMock).toHaveBeenCalledWith(path)
  })
})
