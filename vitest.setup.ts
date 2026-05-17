import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// asciidoctor's Node entry point uses file:// URLs that jsdom rejects.
// Tests don't need real AsciiDoc rendering, so stub it with a pass-through.
vi.mock('asciidoctor', () => ({
  default: () => ({
    convert: (text: string) => ({ toString: () => text ?? '' }),
  }),
}))

// jsdom's navigator.clipboard (if present) may be non-configurable; install a
// configurable stub so tests can swap in their own writeText mock.
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: () => Promise.resolve() },
  writable: true,
  configurable: true,
})
