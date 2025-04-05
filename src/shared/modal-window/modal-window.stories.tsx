import { Meta, StoryObj } from '@storybook/react';
import ModalWindow, { ModalWindowProps } from './modal-window';
import React from 'react';

const meta: Meta<typeof ModalWindow> = {
    title: 'Components/ModalWindow',
    component: ModalWindow,
    argTypes: {
        visible: { control: { type: 'boolean' } },
    }
}

export default meta;

export const Main: StoryObj<typeof ModalWindow> = {
    render: (args: ModalWindowProps) => <ModalWindow {...args} />,
    args: {
        visible: true,
        children: ""
    }
};