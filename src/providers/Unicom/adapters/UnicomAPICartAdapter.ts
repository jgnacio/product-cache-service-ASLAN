import {
  Cart,
  CartProduct,
  CartProductType,
  CartType,
} from "../../../domain/product/entities/Cart";
import { Product } from "../../../domain/product/entities/Product";
import { ICartRepository } from "../../../domain/product/repositories/ICartRepository";
import axios from "axios";
import { UnicomAPICartRequest } from "../UnicomAPIRequets";
import {
  TArticuloCarrito,
  TformatoDisponibilidadInventario,
  TtiposArticulos,
  UnicomAPICart,
} from "../entities/Cart/Cart";

const cart = Cart.getInstance();

const API_UNICOM_TOKEN = process.env.API_UNICOM_TOKEN;
const API_UNICOM_URL = process.env.API_UNICOM_URL;

export class UnicomAPICartAdapter implements ICartRepository {
  private readonly baseUrl = API_UNICOM_URL;
  private readonly token = API_UNICOM_TOKEN;

  constructor() {}

  private async fetchCart({
    body,
    route,
    method = "GET",
  }: {
    route: string;
    body?: UnicomAPICartRequest;
    method?: string;
  }): Promise<UnicomAPICart | null> {
    if (!this.token) {
      throw new Error("Token not found");
    }

    if (!this.baseUrl) {
      throw new Error("URL not found");
    }

    if (!route) {
      throw new Error("Route not found");
    }

    if (method === "GET" && body) {
      throw new Error("GET method does not support body");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    const url = `${this.baseUrl}/${route}`;

    try {
      const response = await axios({
        method,
        url,
        data: body,
        ...config,
      });

      return response.data;
    } catch (error) {
      // console.log("error", error);
      return null;
    }
  }

  async get(): Promise<CartType> {
    const response = await this.fetchCart({
      route: "carrito",
    });

    if (!response) {
      cart.clear();
      return cart.toPlainObject();
    }

    // console.log("response", response);

    const { articulos, total_con_impuestos } = response;

    if (!articulos) {
      cart.clear();
      return cart.toPlainObject();
    }

    const productsToAdd = articulos.map((articulo) => {
      return this.unicomProductCartMapper(articulo);
    });

    cart.addProducts(productsToAdd);
    if (total_con_impuestos) {
      cart.total_including_tax = total_con_impuestos;
    } else {
      cart.products.reduce(
        (acc, product) => (acc + product.price) * (product.tax || 0),
        0
      );
    }

    return cart.toPlainObject();
  }
  async save(cart: Cart): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(cart: Cart): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async addProduct(cart: Cart, product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async clear(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private unicomProductCartMapper(articulo: TArticuloCarrito): CartProduct {
    const {
      cantidad,
      costo_unitario,
      iva_unitario,
      codigo_articulo,
      descripcion,
      disponibilidad,
      esta_rematandose,
      tiene_ing_depto_tecnico,
      tipo_articulo,
    } = articulo;

    if (!codigo_articulo) {
      throw new Error("Product code not found");
    }
    const productOnCart = cart.getProductById(codigo_articulo);

    if (productOnCart) {
      productOnCart.quantity = cantidad;
      return productOnCart;
    }

    const newProduct = new CartProduct({
      sku: codigo_articulo || "",
      price: costo_unitario || 0,
      quantity: cantidad,
      tax: iva_unitario,
      title: descripcion || "",
      available: disponibilidad,
      submitDate: new Date(),
      category: {
        id: tipo_articulo || "",
        name: tipo_articulo || "",
        subCategories: [],
      },
      marca: "",
      stock: 0,
      description: "",
      images: [],
    });

    cart.addProduct(newProduct);

    return newProduct;
  }
}
