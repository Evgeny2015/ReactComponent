import { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import ProdOperList, { IShortOperationWithId, IShortProductWithId } from './prod-oper-list'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import './prod-oper-list.stories.css'


const meta: Meta<typeof ProdOperList> = {
    title: 'Components/ProdOperList',
    component: ProdOperList,
    argTypes: {

    }
}

export default meta;

const OPER_LIST_COUNT = 5
const PRODUCT_LIST_COUNT = 5
const LIST_GROW_COUNT = 3;

interface IListData {
    getProps: () => typeof ProdOperList extends {(props: infer P, context?: any): ReactNode} ? P : never
    grow: (cnt?: number) => void
}

// Генерация случайной операции
const generateOperation = (): IShortOperationWithId => {
    const index = (100*Math.random()).toFixed(0)

    return {
        category: `Категория ${index}`,
        description: `Описание  ${index}`,
        id: uuid(),
        name: `Название  ${index}`,
        sum: Math.round(1e4*Math.random())/1e2
    }
}

// Генерация случайного товара
const generateProduct = (): IShortProductWithId => {
    const index = (100*Math.random()).toFixed(0)

    return {
        description: `Описание  ${index}`,
        id: uuid(),
        image: '',
        name: `Название  ${index}`,
        price: Math.round(1e4*Math.random())/1e2,
    }
}

// Генерация списка операций или товаров
const generateOperationsOrProducts: <T = IShortOperationWithId | IShortProductWithId>(cnt: number, create: () => T) => T[] = (cnt, create) => {
    return Array.from(Array(cnt).keys()).map(() => create())
}


// Список операций
let operData: IShortOperationWithId[] = generateOperationsOrProducts(OPER_LIST_COUNT, generateOperation)
const growOperData = (cnt: number) => {
    operData = [...operData, ...generateOperationsOrProducts(cnt, generateOperation)]
}
const operList: IListData = {
    getProps: () => {
        return {
            type: 'operation',
            data: operData
        }
    },
    grow: (cnt?: number) => {
        growOperData(cnt || LIST_GROW_COUNT)
    }
}

// Список товаров
let prodData: IShortProductWithId[] = generateOperationsOrProducts(PRODUCT_LIST_COUNT, generateProduct)
const growProdData = (cnt: number) => {
    prodData = [...prodData, ...generateOperationsOrProducts(cnt, generateProduct)]
}
const prodList: IListData = {
    getProps: () => {
        return {
            type: 'product',
            data: prodData
        }
    },
    grow: (cnt?: number) => {
        growProdData(cnt || LIST_GROW_COUNT)
    }
}

const ProdOperStory: (listData: IListData) => StoryObj<typeof ProdOperList> = (listData) => {
    return {
    render: (args) => {

        const containerRef = useRef(null)
        const [, updateData] = useArgs()
        const [lastItem, setLastItem] = useState(null)

        // Сохраняем последний элемент из списка. Этот элемент используется для наблюдения
        const setLastItemHandle = () => {
            // console.debug('setLastItemHandle')
            const items = containerRef.current.children
            const lastItem = items[items.length-1]
            setLastItem(lastItem)
        }

        // Если последний элемент становится видимым, добавлям LIST_GROW_COUNT случайных элементов в список
        const intersectionCallback = (entries: any) => {
            if (entries[0].isIntersecting) {
                // console.debug('callbackFunction')
                listData.grow()
                updateData({ data: listData.getProps().data })
                setLastItemHandle()
            }
        }

        // Создаем наблюдателя
        const observer = useRef(new IntersectionObserver(intersectionCallback))

        // Первая загрузка компонента
        useEffect(() => {
            // console.debug('useEffect first')
            setLastItemHandle()
        }, [containerRef])

        // Срабатывает при увеличении списка
        useEffect(() => {
            // console.debug('useEffect next')

            if (lastItem) {
                observer.current.observe(lastItem)
            }

            return () => {
                if (lastItem) {
                    observer.current.unobserve(lastItem)
                    // console.debug('unobserve')
                }
            }
        }, [lastItem])

        // console.debug('render', data.length, args.data.length)
        return (
            <div className='scrollBox' ref={containerRef}>
                <ProdOperList {...args} />
            </div>
        )
    },

    args: listData.getProps()
}}

export const Operation: StoryObj<typeof ProdOperList> = ProdOperStory(operList)
export const Product: StoryObj<typeof ProdOperList> = ProdOperStory(prodList)
