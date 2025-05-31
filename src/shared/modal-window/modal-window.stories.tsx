import { Meta, StoryObj } from '@storybook/react';
import ModalWindow, { ModalWindowProps } from './modal-window';
import React from 'react';

const meta: Meta<typeof ModalWindow> = {
    title: 'Components/ModalWindow',
    component: ModalWindow,
    argTypes: {

    }
}

export default meta;

export const Main: StoryObj<typeof ModalWindow> = {
    render: (args: ModalWindowProps) => <ModalWindow {...args} />,
    args: {
        onClose: () => { },
        children: ""
    }
};