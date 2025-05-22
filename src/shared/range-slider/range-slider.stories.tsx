import { Meta, StoryObj } from '@storybook/react';
import RangeSlider, { RangeSliderProps } from './range-slider';
import React from 'react';

const meta: Meta<typeof RangeSlider> = {
    title: 'Components/RangeSlider',
    component: RangeSlider,
    argTypes: {

    }
}

export default meta;

export const Main: StoryObj<typeof RangeSlider> = {
    render: (args: RangeSliderProps) => <RangeSlider {...args} />,
    args: {
        min: 0,
        max: 100,
        step: 1,
        onChange: ({ }) => {}
    }
};