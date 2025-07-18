import React, { FC } from 'react';
import cn from 'clsx';
import './long-product.css';
import AddToBasketButton from '../add-to-basket-button/add-to-basket-button';
import { Product } from 'src/models/product';
import { Button } from 'antd';
import { useAuth } from 'src/context/auth-provider/AuthProvider';

export interface LongProductProps extends Product {
    onAddToBasket?: (product: Product) => void
    onEditProduct?: (product: Product) => void
};

/**
 * Компонент полного отображения товара
 */
const LongProduct: FC<LongProductProps> = ({ id, price, category, image, name, description, onAddToBasket, onEditProduct }) => {
    const { isAdmin } = useAuth()

    const handleAddToBasket = () => {
        const product: Product = { id, price, category, image, name, description }
        onAddToBasket(product)
    }

    const handleEditProduct = () => {
        const product: Product = { id, price, category, image, name, description }
        onEditProduct(product)
    }

    return (
        <div className={cn('long-product')}>
            <div className={cn('image')}>
                <img src={image} alt="image" />
            </div>
            <div className={cn('product')}>
                <div className={cn('category')}>{category}</div>
                <div className={cn('long-string', 'name')}>{name}</div>
                <div className={cn('long-string', 'desc')}>{description}</div>
            </div>

            <div className={cn('basket')}>
                <div className={cn('price')}>{price}</div>
                <AddToBasketButton count={0} onClick={handleAddToBasket}>Добавить</AddToBasketButton>
                { isAdmin() &&
                    <Button onClick={handleEditProduct}>Ред-ть</Button>
                }
            </div>
        </div>
    );
};

export default LongProduct;