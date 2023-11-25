import type { Meta, StoryObj } from '@storybook/react'
import { DailyCards } from '@/app/components/DailyCards'
import { asClass, createContainer } from 'awilix'
import { MemoryDB } from '@/app/libs/recorder/memory'
import { Recorder } from '@/app/interfaces'
import { ContainerContext } from '@/app/libs/recorder/base'

const container = createContainer()
container.register({ recorder: asClass(MemoryDB).singleton() })
const recorder = container.resolve<Recorder>('recorder')

const meta = {
  title: 'DailyCards',
  component: DailyCards,
  parameters: {},
  args: {
    month: {
      year: 2023,
      month: 11,
    },
  },
  decorators: [
    (Story) => {
      return (
        <ContainerContext.Provider value={container}>
          <Story />
        </ContainerContext.Provider>
      )
    },
  ],
  tags: ['autodoc'],
} satisfies Meta<typeof DailyCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
