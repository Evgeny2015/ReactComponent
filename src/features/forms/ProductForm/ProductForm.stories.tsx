import React from 'react';
import { Meta, StoryObj } from '@storybook/react'
import ProductForm from './ProductForm'

const meta: Meta<typeof ProductForm> = {
    title: 'Components/ProductForm',
    component: ProductForm,
    argTypes: { }
}

export default meta;

export const Main: StoryObj<typeof ProductForm> = {
    render: () => {
        console.debug('render')

        return (
            <ProductForm/>
        )
    }
}