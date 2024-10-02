import { Product, ProductType } from "../entities/Product";
import { UnicomAPIProductRequest } from "@/Resources/API/Unicom/UnicomAPIRequets";

export interface IProductRepository {
  getBySKU(sku: string): Promise<Product | null>;
  getAll({
    request,
    page,
    category,
  }: {
    request: UnicomAPIProductRequest;
    page?: number;
    category?: string;
  }): Promise<Product[]>;
  getFeatured(request?: UnicomAPIProductRequest): Promise<Product[]>;
  getOffers(request?: UnicomAPIProductRequest): Promise<Product[]>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
