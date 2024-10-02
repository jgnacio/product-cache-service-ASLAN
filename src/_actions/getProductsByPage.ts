import { ProductType } from "../domain/product/entities/Product";
import { UnicomAPIProductAdapter } from "../providers/Unicom/adapters/UnicomAPIProductAdapter";

export const getProductsByPage = async ({
  page,
  category,
}: {
  page: number;
  category?: string;
}): Promise<ProductType[]> => {
  const unicomAPIAdapter = new UnicomAPIProductAdapter();

  const products = unicomAPIAdapter.getAll({ page, categoryCode: category });
  const productList: ProductType[] = (await products).map((product) =>
    product.toPlainObject()
  );
  return productList;
};
