import { Meta, StoryObj } from '@storybook/react';
import ThemeToggle, { ThemeProvider } from './theme-toggle';
import React from 'react';

const meta: Meta<typeof ThemeToggle> = {
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
    argTypes: {

    }
}

export default meta;

export const Main: StoryObj<typeof ThemeToggle> = {
    render: () => (<ThemeProvider>
                        <ThemeToggle />
                </ThemeProvider>),
    args: {

    }
};