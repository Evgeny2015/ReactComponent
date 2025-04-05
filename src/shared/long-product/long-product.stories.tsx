import { Meta, StoryObj } from '@storybook/react';
import LongProduct, { LongProductProps } from './long-product';
import React from 'react';
import imageFile from '../../../files/product.webp';


const meta: Meta<typeof LongProduct> = {
    title: 'Components/LongProduct',
    component: LongProduct,
    argTypes: {
        price: { control: { type: 'number' } },
    }
}

export default meta;

export const Main: StoryObj<typeof LongProduct> = {
    render: (args: LongProductProps) => <LongProduct {...args} />,
    args: {
        price: 100,
        category: "категория",
        name: "товар",
        description: "описание товара",
        image: imageFile
    }
};