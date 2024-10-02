import { Cart, CartType } from "../entities/Cart";
import { Product } from "../entities/Product";

export interface ICartRepository {
  get(id?: string): Promise<CartType>;
  save(cart: Cart): Promise<void>;
  update(cart: Cart): Promise<void>;
  addProduct(cart: Cart, product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  clear(id: string): Promise<void>;
}
