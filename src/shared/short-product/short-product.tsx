import React, { FC } from 'react';
import cn from 'clsx';
import './short-product.css';
import AddToBasketButton from '../add-to-basket-button/add-to-basket-button';

export interface ShortProductProps {
    price: number;          // стоимость
    image: string;       // изображение
    name: string;           // название
    description: string;    // описание
};

/**
 * Компонент краткого отображения товара
 */
const ShortProduct: FC<ShortProductProps> = ({ price, image, name, description, ...props }) => {
  return (
    <div className={cn('short-product')}
        {...props}
    >
        <div className={cn('image')}>
            <img src={image} alt="image" />
        </div>
        <div className={cn('product')}>
            <div className={cn('short-string', 'name')}>{name}</div>
            <div className={cn('short-string', 'desc')}>{description}</div>
        </div>

        <div className={cn('basket')}>
            <div className={cn('price')}>{price}</div>
            <AddToBasketButton count={0}>Добавить</AddToBasketButton>
        </div>
    </div>
  );
};

export default ShortProduct;