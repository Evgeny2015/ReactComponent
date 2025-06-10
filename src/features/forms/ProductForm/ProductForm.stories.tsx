import React from 'react';
import { Meta, StoryObj } from '@storybook/react'
import ProductForm, { IProduct } from './ProductForm'

const meta: Meta<typeof ProductForm> = {
    title: 'Components/ProductForm',
    component: ProductForm,
    argTypes: { }
}

export default meta;


const handleCancel = () => {
    console.debug("cancel")
}

const handleSubmit = (data: IProduct) => {
    console.debug(data)
}

export const Main: StoryObj<typeof ProductForm> = {
    render: () => {

        return (
            <ProductForm onCancel={handleCancel} onSubmit={handleSubmit}/>
        )
    }
}