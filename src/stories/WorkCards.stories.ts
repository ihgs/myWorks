import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import WorkCard from '@/app/components/WorkCard';
import WorkCards from '@/app/components/WorkCards';

const meta = {
    title: 'WorkCards',
    component: WorkCards,
    parameters: {

    },
    tags: ['autodoc']
} satisfies Meta<typeof WorkCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        works: [],
        year: 2024,
        month: 1,
        day: 2
    }
}


