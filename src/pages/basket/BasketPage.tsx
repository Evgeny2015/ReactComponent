import React, { FC, useRef, useState } from "react"
import { generateOperationsOrProducts, generateShortProduct } from "src/mocks/prod-oper.generate"
import BasketProduct from "src/shared/basket-product/basket-product"
// import ShortProduct from "src/shared/short-product/short-product"

const PRODUCT_LIST_COUNT = 5


// Список товаров
let productData = generateOperationsOrProducts(PRODUCT_LIST_COUNT, generateShortProduct)

const BasketPage: FC = () => {
  const containerRef = useRef(null)
  const [product, setProduct] = useState(productData)

  return (
    <div className='scrollBox' ref={containerRef}>
      { product.map(x => (
          <BasketProduct
            key={x.id}
            image={x.image}
            name={x.name}
            price={x.price}
          />
        ))
      }
    </div>
  )
}

export default BasketPage