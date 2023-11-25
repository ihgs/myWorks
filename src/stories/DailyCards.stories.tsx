import type { Meta, StoryObj } from '@storybook/react'
import { DailyCards } from '@/app/components/DailyCards'

const meta = {
  title: 'DailyCards',
  component: DailyCards,
  parameters: {},
  args: {
    year: 2023,
    month: 11,
    works: [
      {
        id: 1,
        year: 2023,
        month: 11,
        day: 1,
        start: '09:00',
        end: '10:00',
        item: 'testAItem',
        type: 'testAType',
        comment: 'testAComment',
      },
      {
        id: 2,
        year: 2023,
        month: 11,
        day: 1,
        start: '10:00',
        end: '11:00',
        item: 'testBItem',
        type: 'testBType',
        comment: 'testBComment',
      },
      {
        id: 3,
        year: 2023,
        month: 11,
        day: 2,
        start: '11:00',
        end: '12:00',
        item: 'testCItem',
        type: 'testCType',
        comment: 'testCComment',
      },
      {
        id: 4,
        year: 2023,
        month: 11,
        day: 2,
        start: '12:00',
        end: '13:00',
        item: 'testDItem',
        type: 'testDType',
        comment: 'testDComment',
      },
      {
        id: 5,
        year: 2023,
        month: 11,
        day: 3,
        start: '13:00',
        end: '14:00',
        item: 'testEItem',
        type: 'testEType',
        comment: 'testEComment',
      },
      {
        id: 6,
        year: 2023,
        month: 11,
        day: 10,
        start: '14:00',
        end: '14:30',
        item: 'testFItem',
        type: 'testFType',
        comment: 'testFComment',
      },
    ],
  },
  tags: ['autodoc'],
} satisfies Meta<typeof DailyCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
