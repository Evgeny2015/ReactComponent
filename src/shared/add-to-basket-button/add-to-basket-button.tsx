import React, { FC } from 'react';
import cn from 'clsx';
import './add-to-basket-button.css';

export interface AddToBasketButtonProps {
    count: number;          // счетчик
    children: React.ReactNode;
};

/**
 * Кнопка добавления товара в корзину
 * если счетчик равен нулю, это кнопка, если больше нуля,
 * то это инпут с отображением количества товара и двумя кнопками по краям (увеличения/уменьшения).
 */
const AddToBasketButton: FC<AddToBasketButtonProps> = ({ count }) => {

    const onChangeHandler = () => {

    }

  return (
    <div className={cn('button-container')}>

        <button
            type='button'
            className={cn('button-container', 'button', {'invisible': count != 0 })}
            >
                Добавить
        </button>

        {!count &&
            <button
                type='button'
                className={cn('button-container', 'button')}
                >
                    Добавить
            </button>
        }

        { !!count &&
        <div className={cn('button-container')}>
            <button
                type="button"
                className={cn('button-up')}
                >&lt;&lt;</button>
            <input
                type="number"
                inputMode="numeric"
                className={cn('button-container', 'input')}
                value={count}
                onChange={onChangeHandler}
                />
            <button
                type="button"
                className={cn('button-down')}
            >&gt;&gt;</button>
        </div>
        }
    </div>
  );
};

export default AddToBasketButton;
