import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DateSelector } from './DateSelector'

describe('DateSelector', () => {
  it('renders an input showing the supplied date in YYYY/MM/DD format', () => {
    render(<DateSelector year={2024} month={3} day={15} onChange={vi.fn()} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('2024/03/15')
  })

  it('falls back to today when year/month/day are omitted', () => {
    render(<DateSelector onChange={vi.fn()} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
  })
})
