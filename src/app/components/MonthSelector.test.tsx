import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MonthSelector } from './MonthSelector'

describe('MonthSelector', () => {
  it('renders an input showing the supplied month in YYYY/MM format', () => {
    render(<MonthSelector year={2024} month={3} onChange={vi.fn()} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('2024/03')
  })

  it('falls back to current year/month when none are supplied', () => {
    render(<MonthSelector onChange={vi.fn()} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toMatch(/^\d{4}\/\d{2}$/)
  })
})
