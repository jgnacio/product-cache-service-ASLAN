import { IProductCategoryRepository } from "../../../domain/product/repositories/IProductCategoryRepository";
import { UnicomAPICategory } from "../entities/Category/UnicomAPICategory";
import {
  defaultUnicomAPICategoryRequest,
  defaultUnicomAPIProductRequest,
  UnicomAPICategoryRequest,
  UnicomAPIProductRequest,
} from "../UnicomAPIRequets";
import { ProductCategory } from "../../../domain/product/entities/Product";
import axios from "axios";

const API_UNICOM_TOKEN = process.env.API_UNICOM_TOKEN;
const API_UNICOM_URL = process.env.API_UNICOM_URL;

export class UnicomAPIProductCategoryAdapter
  implements IProductCategoryRepository
{
  private readonly baseUrl = API_UNICOM_URL;
  private readonly token = API_UNICOM_TOKEN;

  async fetchCategories({
    body,
    route,
    method = "GET",
  }: {
    route: string;
    body?: UnicomAPICategoryRequest;
    method?: string;
  }): Promise<UnicomAPICategory[] | null> {
    // const response: UnicomAPICategory[] = await fetch(this.baseUrl + route, {
    //   method,
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: "Bearer " + this.token,
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => {
    //     // console.log("res", res);
    //     if (!res.ok) {
    //       return null;
    //     }
    //     return res.json();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     return null;
    //   });

    // same fetch but axios
    const response = await axios({
      method,
      url: this.baseUrl + route,
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + this.token,
      },
      data: JSON.stringify(body),
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });

    if (!response) {
      return null;
    }
    // console.log("Categories", response);

    return response;
  }

  async getById(id: string): Promise<ProductCategory> {
    return {} as ProductCategory;
  }

  async getAll(): Promise<ProductCategory[]> {
    const defaultCategoryRequest = defaultUnicomAPICategoryRequest;

    const categories = await this.fetchCategories({
      method: "GET",
      route: "/articulos/grupos_articulos",
      body: defaultCategoryRequest,
    });

    categories?.forEach((category) => {
      console.log("Category", category.descripcion);
      console.log("Subcategories", category.codigo_grupo);
      console.log("Subcategories", category.grupos_hijos);
    });

    if (!categories) {
      console.error("Error fetching categories");
      return [];
    }

    const mappedCategories = this.UnicomMapCategories(categories);
    // console.log("Mapped categories", mappedCategories);

    return mappedCategories;
  }

  private UnicomMapSubCategory(
    category: UnicomAPICategory
  ): ProductCategory | null {
    if (!category.codigo_grupo || !category.descripcion) {
      return null;
    }
    return {
      id: category.codigo_grupo,
      name: category.descripcion,
      subCategories:
        category.grupos_hijos
          ?.map(this.UnicomMapSubCategory.bind(this))
          .filter(
            (subCategory): subCategory is ProductCategory =>
              subCategory !== null
          ) || [],
    };
  }
  private UnicomMapCategories(
    categories: UnicomAPICategory[]
  ): ProductCategory[] {
    const mappedCategories: ProductCategory[] = categories
      .map((category: UnicomAPICategory) => this.UnicomMapSubCategory(category))
      .filter((category): category is ProductCategory => category !== null);
    return mappedCategories;
  }
}
