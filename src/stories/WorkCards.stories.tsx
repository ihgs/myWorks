import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import WorkCard from '@/app/components/WorkCard'
import WorkCards from '@/app/components/WorkCards'
import { asClass, createContainer } from 'awilix'
import { MemoryDB } from '@/app/libs/recorder/memory'
import { ContainerContext } from '@/app/libs/recorder/base'
import { Recorder } from '@/app/interfaces'
import { RecoilRoot } from 'recoil'

const container = createContainer()
container.register({ recorder: asClass(MemoryDB).singleton() })
const recorder = container.resolve<Recorder>('recorder')

const meta = {
  title: 'WorkCards',
  component: WorkCards,
  parameters: {},
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <ContainerContext.Provider value={container}>
            <Story />
          </ContainerContext.Provider>
        </RecoilRoot>
      )
    },
  ],
  tags: ['autodoc'],
} satisfies Meta<typeof WorkCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: 2024,
    month: 1,
    day: 2,
  },
}
