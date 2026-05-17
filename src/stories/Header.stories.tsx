import { Header } from '@/app/components/Header'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Header',
  component: Header,
  parameters: {
    nextjs: { appDirectory: true },
  },
  tags: ['autodoc'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
