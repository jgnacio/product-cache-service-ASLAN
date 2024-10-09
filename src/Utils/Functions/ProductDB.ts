import { PrismaClient, Prisma } from "@prisma/client";
import { getProductsByPage } from "../../_actions/getProductsByPage";
import { ProductType } from "../../domain/product/entities/Product";

const prisma = new PrismaClient();

export const createProduct = async (
  product: ProductType,
  provider?: string
) => {
  const partNumber = product.partNumber
    ? product.partNumber[0].partNumber
    : "Part Number not available";

  // Buscar un producto con el mismo Titulo y SKU para no duplicar

  const productExists = await prisma.product.findFirst({
    where: {
      AND: [
        { title: product.title },
        { sku: product.sku },
        { providerId: 1 },
        { partNumber: partNumber },
      ],
    },
  });

  if (productExists) {
    console.log("Product already exists", productExists);
    // Update Product
    updateProduct(productExists, product);
  } else {
    let newProduct;
    try {
      newProduct = await prisma.product.create({
        data: {
          title: product.title,
          price: product.price,
          categoryId: product.category.id,
          providerId: 1,
          availability: product.availability,
          description: product.description,
          marca: product.marca,
          partNumber: partNumber,
          sku: product.sku,
          stock: product.stock,
          createdAt: new Date(),
          estimatedArrivalDate: product.estimatedArrivalDate,
          updatedAt: new Date(),
          guaranteeDays: product.guaranteeDays,
          favorite: product.favorite,
          onSale: product.onSale,
        },
      });
      console.log("Product created", newProduct);
    } catch (error) {
      console.log("Error creating product", product, error);
    }
    return newProduct;
  }

  return productExists;
};

export const updateProduct = async (
  productDatabase: any,
  productUpdated: ProductType
) => {
  const partNumber = productUpdated.partNumber
    ? productUpdated.partNumber[0].partNumber
    : productDatabase.partNumber;

  const updatedProduct = await prisma.product.update({
    where: {
      id: productDatabase.id,
    },
    data: {
      title: productUpdated.title,
      price: productUpdated.price,
      categoryId: productUpdated.category.id,
      providerId: 1,
      availability: productUpdated.availability,
      description: productUpdated.description,
      marca: productUpdated.marca,
      partNumber: partNumber,
      sku: productUpdated.sku,
      stock: productUpdated.stock,
      createdAt: productDatabase.createdAt,
      estimatedArrivalDate: productUpdated.estimatedArrivalDate,
      updatedAt: new Date(),
      guaranteeDays: productUpdated.guaranteeDays,
      favorite: productUpdated.favorite,
      onSale: productUpdated.onSale,
    },
  });

  return updatedProduct;
};

export const filterProducts = async (
  categoryCode: string,
  providerId: number
) => {
  const category = await prisma.category.findFirst({
    where: {
      code: categoryCode,
    },
  });

  if (!category) {
    console.log("Category not found");
    return [];
  }

  return await prisma.product.findMany({
    where: {
      AND: [{ categoryId: category?.id }, { providerId: providerId }],
    },
    include: {
      category: true,
      provider: true,
    },
  });
};

export const sortedProducts = async (
  sortBy: "price" | "title",
  order: "asc" | "desc"
) => {
  return await prisma.product.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      category: true,
      provider: true,
    },
  });
};

export const getAllProducts = async (): Promise<ProductType[]> => {
  const products = await getProductsByPage({ page: 1 });
  let page = 2;
  let count = products.length;
  console.log("products length:", products.length);
  while (count >= 100) {
    const newProducts = await getProductsByPage({ page });
    products.push(...newProducts);
    console.log("products length:", products.length);
    page++;
    count = newProducts.length;
  }
  return products;
};
