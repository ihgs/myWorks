import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import WorkCard from '@/app/components/WorkCard';

const meta = {
    title: 'WorkCard',
    component: WorkCard,
    parameters: {

    },
    tags: ['autodoc']
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        work: {year: 2023, month: 12, day: 1}
    }
}



export const Display: Story = {
    args: {
        work: {
            year: 2024,
            month: 1,
            day: 1,
            start: "12:00",
            end: "13:00",
            item: "test",
            type: "mode",
            comment: "xxxxxxxxxxyyyyyyyyyyyxfhdiahfahfdiaphi"
        },
        edit: false
    }
}

export const DisplayLongItem: Story = {
    args: {
        work: {
            year: 2024,
            month: 1,
            day: 1,
            start: "12:00",
            end: "13:00",
            item: "tesfdahofihaoidfhaiohfoiahfodhfoahdfioaogjaoghoghaoirfhgoaihgioajdgoahrfiorhgaioaghoihgioft",
            type: "mode",
            comment: "xxxxxxxxxxyyyyyyyyyyyxfhdiahfahfdiaphi"
        },
        edit: false
    }
}





export const Save: Story = {
    args: {
        work: {year: 2023, month: 12, day: 1}
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)

        await userEvent.type(canvas.getByLabelText('start'), "11:00")
        await userEvent.type(canvas.getByLabelText('end'), "12:00")
        await userEvent.type(canvas.getByLabelText('item'), "打ち合わせ")
        await userEvent.type(canvas.getByLabelText('type'), "打ち合わせ")
        await userEvent.type(canvas.getByLabelText('comment'), "打ち合わせ")

        await userEvent.click(canvas.getByRole('button'))

        await waitFor(async ()=>{
            await expect(
                canvas.getByText("11:00 ~ 12:00")
            ).toBeInTheDocument()    
        })
    }
}