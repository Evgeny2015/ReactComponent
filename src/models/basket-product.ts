import { Product } from "./product";

export type BasketProductType = Pick<Product, "id" | "image" | "name" | "price">;

export function GetBasketFromProduct(prod: Product[]): BasketProductType[] {
  return prod.map(x => <BasketProductType>{ id: x.id, image: x.image, name: x.name, price: x.price })
}
