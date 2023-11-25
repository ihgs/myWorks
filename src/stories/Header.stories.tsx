import { Header } from '@/app/components/Header'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Header',
  component: Header,
  parameters: {},
  tags: ['autodoc'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
