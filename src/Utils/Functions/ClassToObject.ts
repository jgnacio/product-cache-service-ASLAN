import { ProductType, Product } from "../../domain/product/entities/Product";
export function ProductObjToClass(product: ProductType): Product {
  return new Product({
    title: product.title,
    price: product.price,
    partNumber: product.partNumber,
    sku: product.sku,
    description: product.description,
    images: product.images,
    category: product.category,
    marca: product.marca,
    stock: product.stock,
    availability: product.availability,
    submitDate: product.submitDate,
    favorite: product.favorite,
    onSale: product.onSale,
    guaranteeDays: product.guaranteeDays,
    estimatedArrivalDate: product.estimatedArrivalDate,
  });
}

export function ProductClassToObj(product: Product): ProductType {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    partNumber: product.partNumber,
    sku: product.getSku(),
    description: product.description,
    images: product.images,
    category: product.category,
    marca: product.marca,
    stock: product.stock,
    availability: product.availability,
    submitDate: product.submitDate,
    favorite: product.favorite,
    onSale: product.onSale,
    guaranteeDays: product.guaranteeDays,
    estimatedArrivalDate: product.estimatedArrivalDate,
  };
}
