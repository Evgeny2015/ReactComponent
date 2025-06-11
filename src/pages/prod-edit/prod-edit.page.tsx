import React, { FC, useState } from "react"
import { useNavigate } from "react-router"
import ProductForm, { IProduct } from "src/features/forms/ProductForm/ProductForm"
import { Modal } from "src/shared/modal-window/modal"


const ProductEditDialog: FC = () => {
    const [visible, setVisisble] = useState(true)
    const navigator = useNavigate()

    const handleCancel = () => {
        setVisisble(false)
        navigator("/")
    }

    const handleSubmit = (data: IProduct) => {
        setVisisble(false)

        console.debug('submit -->', data)
        navigator("/")
    }

    return (
        <Modal visible={visible}>
            <ProductForm onCancel={handleCancel} onSubmit={handleSubmit}></ProductForm>
        </Modal>
    )
}

export default ProductEditDialog