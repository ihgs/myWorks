import { MonthSelector } from '@/app/components/MonthSelector'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'MonthSelector',
  component: MonthSelector,
  parameters: {},
  tags: ['autodoc'],
} satisfies Meta<typeof MonthSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: 2023,
    month: 12,
    onChange: ({ year, month }) => console.log(`${year}/${month}`),
  },
}
