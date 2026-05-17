import { describe, expect, it } from 'vitest'
import { parseMin, myParseInt, roundQuartor } from './utils'

describe('parseMin', () => {
  it('parses HH:MM into total minutes', () => {
    expect(parseMin('09:30')).toBe(570)
    expect(parseMin('00:00')).toBe(0)
    expect(parseMin('23:59')).toBe(23 * 60 + 59)
  })

  it('returns 0 for undefined or empty', () => {
    expect(parseMin(undefined)).toBe(0)
    expect(parseMin('')).toBe(0)
  })

  it('returns 0 when format does not match', () => {
    expect(parseMin('abc')).toBe(0)
    expect(parseMin('12')).toBe(0)
  })
})

describe('myParseInt', () => {
  it('parses numeric strings', () => {
    expect(myParseInt('42', 0)).toBe(42)
  })

  it('returns the default for null', () => {
    expect(myParseInt(null, 7)).toBe(7)
  })

  it('returns the default for non-numeric input', () => {
    expect(myParseInt('abc', 9)).toBe(9)
  })
})

describe('roundQuartor', () => {
  it('rounds minutes down within each quarter', () => {
    expect(roundQuartor(0)).toEqual([0, 0])
    expect(roundQuartor(7)).toEqual([0, 0])
    expect(roundQuartor(8)).toEqual([0, 15])
    expect(roundQuartor(22)).toEqual([0, 15])
    expect(roundQuartor(23)).toEqual([0, 30])
    expect(roundQuartor(37)).toEqual([0, 30])
    expect(roundQuartor(38)).toEqual([0, 45])
    expect(roundQuartor(52)).toEqual([0, 45])
    expect(roundQuartor(53)).toEqual([1, 0])
    expect(roundQuartor(59)).toEqual([1, 0])
  })
})
