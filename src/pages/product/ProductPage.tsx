import React, { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

import { generateLongProducts } from "src/mocks/prod-oper.generate"
import LongProduct from "src/shared/long-product/long-product"
import { Modal } from "src/shared/modal-window/modal"
import EditOperation from "src/shared/edit-operation/edit-operation"
import ProductForm, { IProduct } from "src/features/forms/ProductForm/ProductForm"
import { Product } from "src/models/product"
import { useDispatch } from "react-redux"
import { basketActions } from "src/store/basket"
import './ProductPage.css'
import { Button } from "antd"


const PRODUCT_LIST_COUNT = 20
const LIST_GROW_COUNT = 10

// Список товаров
let productData = generateLongProducts(PRODUCT_LIST_COUNT)

const growProdData = (cnt: number = LIST_GROW_COUNT) => {
  productData = [...productData, ...generateLongProducts(cnt)]
}

let editProduct: IProduct | null = null

const ProductPage: FC = () => {
  const containerRef = useRef(null)
  const dispatcher = useDispatch()
  const [lastItem, setLastItem] = useState(null)
  const [product, setProduct] = useState(productData)
  // const [editVisible, setEditVisible] = useState(false)
  const navigator = useNavigate()

  // Сохраняем последний элемент из списка. Этот элемент используется для наблюдения
  const setLastItemHandle = () => {
    const items = containerRef.current.children
    const lastItem = items[items.length - 1]
    // console.debug('set lastItem', lastItem)
    setLastItem(lastItem)
  }

  // Если последний элемент становится видимым, добавлям LIST_GROW_COUNT случайных элементов в список
  const intersectionCallback = (entries: any) => {
    if (entries[0].isIntersecting) {
      growProdData()
      setProduct(productData)
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
      // observer.current.disconnect()
      observer.current.observe(lastItem)
    } else {
      // console.debug('useEffect error')
    }

    return () => {
      if (lastItem) {
        observer.current.unobserve(lastItem)
        // console.debug('unobserve')
      }
    }
  }, [lastItem])

  const handleOnClose = () => {
    // setEditVisible(false)
  }

  const handleSubmit = (data: IProduct) => {
    handleOnClose()
    console.debug(data)
  }

  // добавляем товар в корзину
  const handleAddToBasket = (product: Product) => {
    dispatcher(basketActions.add(product))
  }

  // редактируем товар
  const handleEditProduct = (product: Product) => {
    const { price, name, desc } = product
    editProduct = { price, name, description: desc }
    // setEditVisible(true)
  }

  return (
    <div>
      <div className='scrollBox' ref={containerRef}>
        {product.map(x => (
          <LongProduct
            key={x.id}
            product={x}
            onAddToBasket={handleAddToBasket}
            onEditProduct={handleEditProduct}
          />
        ))
        }
      </div>

      <Button onClick={() => navigator("/edit")}>Ред-ть</Button>
    </div>
  )
}

export default ProductPage