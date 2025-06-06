import { v4 as uuid } from 'uuid'
import { IShortOperationWithId, IShortProductWithId } from "src/shared/prod-oper-list/prod-oper-list"
import { LongProductProps } from 'src/shared/long-product/long-product'

// Генерация случайной операции
export const generateOperation = (): IShortOperationWithId => {
    const index = (100 * Math.random()).toFixed(0)

    return {
        category: `Категория ${index}`,
        description: `Описание  ${index}`,
        id: uuid(),
        name: `Название  ${index}`,
        sum: Math.round(1e4 * Math.random()) / 1e2
    }
}

// Генерация случайного товара
export const generateShortProduct = (): IShortProductWithId => {
    const index = (100 * Math.random()).toFixed(0)

    return {
        description: `Описание  ${index}`,
        id: uuid(),
        image: '',
        name: `Название  ${index}`,
        price: Math.round(1e4 * Math.random()) / 1e2,
    }
}

// Генерация списка операций или товаров
export const generateOperationsOrProducts: <T = IShortOperationWithId | IShortProductWithId>(cnt: number, create: () => T) => T[] = (cnt, create) => {
    return Array.from(Array(cnt).keys()).map(() => create())
}

// Генерация случайного полного товара
export const generateLongProduct = (): LongProductProps & { id: string } => {
    const index = (100 * Math.random()).toFixed(0)

    return {
        description: `Описание  ${index}`,
        category: `Категория  ${index}`,
        id: uuid(),
        image: '',
        name: `Название  ${index}`,
        price: Math.round(1e4 * Math.random()) / 1e2,
    }
}

// Генерация случайного полного товара
export const generateLongProducts = (cnt: number): (LongProductProps & { id: string })[] => {
    return Array.from(Array(cnt).keys()).map(() => generateLongProduct())
}