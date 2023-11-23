import { DateSelector } from "@/app/components/DateSelector";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: 'DateSelector',
    component: DateSelector,
    parameters: {
    },
    tags: ['autodoc']
} satisfies Meta<typeof DateSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        year: 2023,
        month: 12,
        day: 1,
        onChange: (year, month, day)=>console.log(`${year}/${month}/${day}`)
    },
}