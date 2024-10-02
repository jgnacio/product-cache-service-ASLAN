import { ProductCategory } from "../entities/Product";

export interface IProductCategoryRepository {
  getAll(): Promise<ProductCategory[]>;
  getById(id: string): Promise<ProductCategory>;
}
