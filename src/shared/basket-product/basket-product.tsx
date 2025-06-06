import React, { FC } from 'react';
import cn from 'clsx';
import './basket-product.css';

export interface BasketProductProps {
    price: number;          // стоимость
    image: string;       // изображение
    name: string;           // название
};

/**
 * Компонент отображения товара для корзины
 */
const BasketProduct: FC<BasketProductProps> = ({ price, image, name }) => {
  return (
    <div className={cn('basket-product')}
    >
        <div className={cn('image')}>
            <img src={image} alt="image" />
        </div>
        <div className={cn('product')}>
            <div className={cn('price')}>{price}</div>
            <div className={cn('short-string', 'name')}>{name}</div>
        </div>

        <div className={cn('basket')}>
            <button
                type='button'
                className={cn('basket-button')}
            >
                Удалить
            </button>
        </div>
    </div>
  );
};

export default BasketProduct;