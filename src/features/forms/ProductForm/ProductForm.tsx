import React, { FC } from "react"
import { Button, Form, Input } from 'antd';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { FormItem } from '../../../shared/form-item/form-item';
import { data } from "react-router";


export interface IProduct {
    price: number          // стоимость
    name: string           // название
    description: string    // описание
};

export interface IProductProps {
    product?: IProduct
    onSubmit: SubmitHandler<IProduct>
}

const ProductForm: FC<IProductProps> = ({product, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<IProduct>()
    // const onSubmit: SubmitHandler<IProduct> = (data) =>

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                rules={{
                    required: "Обязательно для заполнения",
                    minLength: {
                        value: 10,
                        message: "Минимальная длина названия - 10 символов" }
                }}
                render={({ field }) => (
                    <Form.Item>
                        <FormItem
                            title="Название"
                            validateStatus={errors && errors["name"] ? "error" : ""}
                            help={errors.name?.message}
                        >
                            <Input {...field} />
                        </FormItem>
                    </Form.Item>
                )}
            />

            <Controller
                name="description"
                control={control}
                rules={{
                    required: "Обязательно для заполнения",
                    minLength: {
                        value: 10,
                        message: "Минимальная длина описания - 10 символов"
                    }
                }}
                render={({ field }) => (
                    <Form.Item>
                        <FormItem
                            title="Описание"
                            validateStatus={errors && errors["description"] ? "error" : ""}
                            help={errors.description?.message}
                        >
                            <Input {...field} />
                        </FormItem>
                    </Form.Item>
                )}
            />

            <Controller
                name="price"
                rules={{ required: "Обязательно для заполнения", min: { value: 10, message: "Минимальная цена 10" } }}
                control={control}
                render={({ field }) => (
                    <Form.Item>
                        <FormItem
                            title="Цена"
                            validateStatus={errors && errors["price"] ? "error" : ""}
                            help={errors.price?.message}
                        >
                            <Input {...field} />
                        </FormItem>
                    </Form.Item>
                )}
            />

            <Button htmlType="submit">Сохранить</Button>
        </form>
    )
}

export default ProductForm