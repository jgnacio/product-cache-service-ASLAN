// import { getTokenDev } from "@/adapters/Auth/token(remove-on-prod)";

import { IProductRepository } from "../../../domain/product/repositories/IProductRepository";
import {
  Product,
  ProductAvailability,
  ProductCategory,
  ProductPartNumber,
  ProductType,
} from "../../../domain/product/entities/Product";
import {
  defaultUnicomAPIRelevantCategories,
  getDefaultUnicomAPIProductRequest,
  UnicomAPIProductRequest,
} from "../UnicomAPIRequets";
import { UnicomAPIOfferCombo } from "../entities/Product/UnicomAPIOfferCombo";
import {
  TDatosPartNumber,
  UnicomAPIProduct,
} from "../entities/Product/UnicomAPIProduct";
import { UnicomAPIOfferProduct } from "../entities/Product/UnicomAPIOfferProduct";
import { UnicomAPIPreAssembledPC } from "../entities/Product/UnicomAPIPreAssembledPC";
import {
  ProductClassToObj,
  ProductObjToClass,
} from "../../../Utils/Functions/ClassToObject";
import { UnicomAPIProductDetailResponse } from "../entities/Product/UnicomAPIProductDetailResponse";
import { UnicomAPIProductDetailRequest } from "../entities/Product/UnicomAPIProductDetailRequest";
import { UnicomEnviroment } from "../UnicomEnviroment";
import axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UnicomAPIProductAdapter implements IProductRepository {
  private readonly baseUrl = UnicomEnviroment.UNICOM_API_URL;
  private readonly token = UnicomEnviroment.UNICOM_API_KEY;

  constructor() {}

  private async fetchProducts({
    body,
    route,
    method = "GET",
  }: {
    route: string;
    body?: UnicomAPIProductRequest;
    method?: string;
  }): Promise<
    | UnicomAPIProduct[]
    | UnicomAPIOfferCombo[]
    | UnicomAPIOfferProduct[]
    | UnicomAPIPreAssembledPC[]
    | null
  > {
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

    return response;
  }

  private async fetchProduct({
    body,
    route,
    method = "GET",
  }: {
    route: string;
    body?: UnicomAPIProductDetailRequest;
    method?: string;
  }): Promise<UnicomAPIProductDetailResponse | null> {
    const response: UnicomAPIProductDetailResponse = await fetch(
      this.baseUrl + route,
      {
        method,
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + this.token,
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => {
        // console.log("res", res);
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });

    if (!response) {
      return null;
    }

    return response;
  }

  async getBySKU(sku: string): Promise<Product | null> {
    const response = await this.fetchProduct({
      method: "GET",
      route: `/articulos/${sku}`,
    });

    if (!response) {
      return null;
    }

    const datosPartnumbers = response.datos_partnumbers ?? [];

    const mappedPartnumbers: ProductPartNumber[] = datosPartnumbers.map(
      (partNumber: TDatosPartNumber) => {
        const { partnumber, ean, unidades_x_caja } = partNumber;
        return {
          partNumber: partnumber || "",
          ean: ean || 0,
          units_x_box: unidades_x_caja || 0,
        };
      }
    );

    let mappedAvailability: ProductAvailability = "out_of_stock";

    if (response.disponibilidad === "con_inventario") {
      mappedAvailability = "in_stock";
    }

    if (response.disponibilidad === "sin_inventario") {
      mappedAvailability = "out_of_stock";
    }

    if (response.disponibilidad === "consultar") {
      mappedAvailability = "on_demand";
    }

    try {
      const product = new Product({
        partNumber: mappedPartnumbers,
        sku: response.codigo || "",
        price: response.precio || 0,
        title: response.producto || "",
        description: response.descripcion || "",
        images: [],
        category: {
          id: response.grupo_articulo?.codigo_grupo || "",
          name: response.grupo_articulo?.descripcion || "",
          code: response.grupo_articulo?.codigo_grupo || "",
        },
        marca: response.marca?.marca || "",
        stock: response.inventario || 0,
        availability: mappedAvailability,
        submitDate: new Date(),
        estimatedArrivalDate: response.fecha_estimada_llegada
          ? new Date(response.fecha_estimada_llegada)
          : null,
        guaranteeDays: response.garantia_dias,
      });

      return product;
    } catch {
      return null;
    }
  }

  async getAll({
    request,
    page,
    categoryCode,
  }: {
    request?: UnicomAPIProductRequest;
    page?: number;
    categoryCode?: string;
  }): Promise<Product[]> {
    const defaultRequest: UnicomAPIProductRequest =
      request || getDefaultUnicomAPIProductRequest();
    console.log("defaultRequest", defaultRequest);

    if (page) {
      defaultRequest.rango_articulos_informe.hasta_articulo_nro = page * 200;
      defaultRequest.rango_articulos_informe.desde_articulo_nro =
        200 * page - 199;
    }
    if (categoryCode) {
      console.log("categoryCode", categoryCode);
      defaultRequest.codigo_grupo = categoryCode;
    }
    const response = await this.fetchProducts({
      method: "PUT",
      body: defaultRequest,
      route: "/articulos",
    });

    if (!response) {
      return [];
    }
    let productsResponse = response;
    if (
      defaultRequest.codigo_grupo !== "" &&
      defaultRequest.codigo_grupo === "01.10"
    ) {
      // Filtrar productos por tags de busqueda para eliminar los que sean SATA/SSD/M.2
      productsResponse = productsResponse.filter(
        (product) =>
          product.tags_de_busqueda?.includes("torre") ||
          product.tags_de_busqueda?.includes("chasis") ||
          product.tags_de_busqueda?.includes("tower") ||
          product.tags_de_busqueda?.includes("mini-itx") ||
          product.tags_de_busqueda?.includes("micro-atx") ||
          product.tags_de_busqueda?.includes("mid tower") ||
          product.tags_de_busqueda?.includes("full tower") ||
          product.tags_de_busqueda?.includes("mini-itx")
      );
    }

    const products = this.mapUnicomProduct(productsResponse);

    return products;
  }

  async getFeatured(request?: UnicomAPIProductRequest): Promise<Product[]> {
    const defaultRequest = request || getDefaultUnicomAPIProductRequest();
    // Only featured
    defaultRequest.solo_articulos_destacados = true;
    const UnicomProductRequest = this.mapToUnicomRequest(defaultRequest);
    const response = await this.fetchProducts({
      method: "PUT",
      body: UnicomProductRequest,
      route: "/articulos",
    });

    // console.log("response", response);

    if (!response) {
      return [];
    }

    const products = this.mapUnicomProduct(response);

    return products;
  }

  async getOffers(request?: UnicomAPIProductRequest): Promise<Product[]> {
    const routes = [
      "/ofertas/liquidaciones",
      // "/ofertas/combos",
      // "/ofertas/equipos",
    ];

    // iter one by one route
    let productList: any = [];

    for (const route of routes) {
      const response = await this.fetchProducts({
        method: "GET",
        route,
      });

      productList.push(response);
    }

    // Validate response
    if (!productList) {
      return [];
    }
    const flatResponse = productList.flat();

    // console.log("flatResponse", flatResponse);

    // Eliminar nulls y mapear productos

    const cleanedResponse = flatResponse.filter((item: any) => item !== null);

    console.log("cleanedResponse", cleanedResponse);

    const products = this.mapUnicomProduct(cleanedResponse as Product[]);

    return products;
  }

  async save(product: Product): Promise<void> {
    return;
  }

  async update(product: Product): Promise<void> {
    return;
  }

  async delete(id: number): Promise<void> {
    return;
  }

  private mapToUnicomRequest(
    request: UnicomAPIProductRequest
  ): UnicomAPIProductRequest {
    const formattedData: UnicomAPIProductRequest = {
      solo_modificados_desde: request.solo_modificados_desde || "",
      tipo_informe: request.tipo_informe || "completo",
      solo_articulos_destacados: request.solo_articulos_destacados || false,
      solo_favoritos: request.solo_favoritos || false,
      codigo_grupo: request.codigo_grupo || "",
      codigo_marca: request.codigo_marca || "",
      rango_articulos_informe: {
        desde_articulo_nro: request.rango_articulos_informe?.desde_articulo_nro,
        hasta_articulo_nro: request.rango_articulos_informe?.hasta_articulo_nro,
      },
    };

    // Eliminar campos vacíos si son ""
    Object.keys(formattedData).forEach(
      (key) => formattedData[key] === "" && delete formattedData[key]
    );
    return formattedData;
  }

  private async mapUnicomProduct(
    productsResponse:
      | UnicomAPIProduct[]
      | UnicomAPIOfferCombo[]
      | UnicomAPIOfferProduct[]
      | UnicomAPIPreAssembledPC[]
      | null
  ): Promise<Product[]> {
    if (!productsResponse || productsResponse.length === 0) {
      return [];
    }

    // Prepara un mapa para almacenar las categorías ya buscadas
    const categoriesMap: { [key: string]: any | null } = {};
    const categoriesToCreate: { name: string; nameES: string; code: string }[] =
      [];

    // Obtiene todas las categorías relevantes de una sola vez
    const existingCategories = await prisma.category.findMany({
      where: {
        code: {
          in: productsResponse
            .map((item) => item.grupo_articulo?.codigo_grupo)
            .filter(Boolean),
        },
      },
    });

    // Poblamos el mapa de categorías
    existingCategories.forEach((category) => {
      categoriesMap[category.code] = category;
    });

    const products = await Promise.all(
      productsResponse.map(async (item) => {
        try {
          const datosPartnumber = item.datos_ultimo_partnumber || {};
          const mappedPartnumber = [
            {
              partNumber: datosPartnumber.partnumber || "",
              ean: datosPartnumber.ean || 0,
              units_x_box: datosPartnumber.unidades_x_caja || 0,
            },
          ];

          // Simplificación de la disponibilidad
          let mappedAvailability: ProductAvailability =
            item.disponibilidad === "con_inventario"
              ? "in_stock"
              : item.disponibilidad === "consultar"
              ? "on_demand"
              : "out_of_stock";

          if (!item.producto && !item.nombre_equipo && !item.nombre_oferta) {
            return null;
          }

          // Ajuste de inventario
          const stock = Math.max(0, item.inventario || 0);

          const { codigo_grupo, descripcion } = item.grupo_articulo || {};

          // Verifica si se encontró la categoría
          if (categoriesMap[codigo_grupo]) {
            item.grupo_articulo = categoriesMap[codigo_grupo];
          } else {
            // Agrega la categoría para crear más tarde
            categoriesToCreate.push({
              name: descripcion || "",
              nameES: descripcion || "",
              code: codigo_grupo || "",
            });
          }

          // Creación del producto mapeado
          return new Product({
            title:
              item.producto || item.nombre_equipo || item.nombre_oferta || "",
            sku: item.codigo || item.codigo_equipo || item.codigo_oferta || "",
            price:
              item.precio ||
              item.costo ||
              item.precio_bonificado ||
              item.costo_bonificado,
            partNumber: mappedPartnumber,
            description: item.descripcion || "",
            images: item.fotos || [],
            category: item.grupo_articulo || null,
            availability: mappedAvailability,
            marca: item.marca?.marca || "",
            stock,
            submitDate: new Date(),
            estimatedArrivalDate: item.fecha_estimada_llegada
              ? new Date(item.fecha_estimada_llegada)
              : null,
            guaranteeDays: item.garantia_dias || 0,
          });
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      })
    );

    // Crear categorías no encontradas en lote
    const uniqueCategories = Array.from(
      new Set(categoriesToCreate.map((cat) => cat.code))
    )
      .map((code) => {
        return categoriesToCreate.find((cat) => cat.code === code);
      })
      .filter(Boolean);

    if (uniqueCategories.length > 0) {
      await Promise.all(
        uniqueCategories.map(async (category) => {
          try {
            const { code, name, nameES } = category || {};
            await prisma.category.create({
              data: {
                name: name || "",
                nameES: nameES || "",
                code: code || "",
              },
            });
          } catch (error) {
            console.error("Error creating category:", error);
          }
        })
      );
    }
    // Filtrar productos válidos
    return products.filter((item) => item !== null);
  }
}
