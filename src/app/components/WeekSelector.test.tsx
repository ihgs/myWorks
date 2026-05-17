import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WeekSelector } from './WeekSelector'

describe('WeekSelector', () => {
  it('renders an input showing the supplied date in YYYY/MM/DD format', () => {
    render(<WeekSelector year={2024} month={1} day={3} onChange={vi.fn()} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('2024/01/03')
  })
})
