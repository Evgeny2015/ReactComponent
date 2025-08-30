import { Product } from "./product";

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
}