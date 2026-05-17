import { WeekSelector } from '@/app/components/WeekSelector'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'WeekSelector',
  component: WeekSelector,
  parameters: {},
  tags: ['autodoc'],
} satisfies Meta<typeof WeekSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: 2024,
    month: 1,
    day: 3,
    onChange: ({ year, month, day }) => console.log(`${year}/${month}/${day}`),
  },
}
