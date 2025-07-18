import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BasketProductType, GetBasketFromProduct } from "src/models/basket-product"
import BasketProduct from "src/shared/basket-product/basket-product"
import { basketActions, basketSelectors } from "src/store/basket"


const BasketPage: FC = () => {
  const basket = useSelector(basketSelectors.get)
  const containerRef = useRef(null)
  const dispatcher = useDispatch()
  const [prodInBasket, setProdInBasket] = useState<BasketProductType[]>([])

  useEffect(() => {
    if (basket === null) {
      return
    }
    setProdInBasket(GetBasketFromProduct(basket))
  }, [basket])

  // удаляем товар из корзины
  const handleRemoveItem = (id: BasketProductType["id"]) => {
    dispatcher(basketActions.remove(id))
  }

  return (
    <div className='scrollBox' ref={containerRef}>
      { prodInBasket.map(x => (
          <BasketProduct
            key={x.id}
            id={x.id}
            image={x.image}
            name={x.name}
            price={x.price}
            onRemoveItem={handleRemoveItem}
          />
        ))
      }
    </div>
  )
}

export default BasketPage