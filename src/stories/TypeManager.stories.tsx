import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TypeManager } from '@/app/components/TypeManager'
import { asValue, createContainer } from 'awilix'
import { ContainerContext } from '@/app/libs/recorder/base'

const makeFakeRecorder = (initial: MyType[]) => {
  let data: MyType[] = [...initial]
  let nextId = data.reduce((m, d) => Math.max(m, d.id ?? 0), 0) + 1
  return {
    async save(t: MyType) {
      const saved = { ...t, id: nextId++ }
      data.push(saved)
      return saved
    },
    async list() {
      return [...data]
    },
    async delete(id: number) {
      data = data.filter((t) => t.id !== id)
    },
    async update(t: MyType) {
      return t
    },
    async listByDay() {
      return []
    },
    async listByMonth() {
      return []
    },
    async listTypes() {
      return [...data]
    },
  }
}

const withRecorder = (initial: MyType[]) => (Story: any) => {
  const container = createContainer()
  container.register({ recorder: asValue(makeFakeRecorder(initial)) })
  return (
    <ContainerContext.Provider value={container}>
      <Story />
    </ContainerContext.Provider>
  )
}

const meta = {
  title: 'TypeManager',
  component: TypeManager,
  parameters: {},
  tags: ['autodoc'],
} satisfies Meta<typeof TypeManager>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    withRecorder([
      { id: 1, name: 'work', code: 'W' },
      { id: 2, name: 'meeting', code: 'M' },
    ]),
  ],
}

export const Empty: Story = {
  decorators: [withRecorder([])],
}
