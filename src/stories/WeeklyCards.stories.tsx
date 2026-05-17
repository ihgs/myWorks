import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WeeklyCards } from '@/app/components/WeeklyCards'
import { asClass, createContainer } from 'awilix'
import { MemoryDB } from '@/app/libs/recorder/memory'
import { ContainerContext } from '@/app/libs/recorder/base'

const container = createContainer()
container.register({ recorder: asClass(MemoryDB).singleton() })

const meta = {
  title: 'WeeklyCards',
  component: WeeklyCards,
  parameters: {},
  args: {
    week: {
      year: 2024,
      month: 1,
      day: 1,
    },
  },
  decorators: [
    (Story) => (
      <ContainerContext.Provider value={container}>
        <Story />
      </ContainerContext.Provider>
    ),
  ],
  tags: ['autodoc'],
} satisfies Meta<typeof WeeklyCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
