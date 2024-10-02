import {
  ProductClassToObj,
  ProductObjToClass,
} from "../../../Utils/Functions/ClassToObject";
import { v4 as uuid } from "uuid";

/**
 * Representa una entidad de producto en el dominio de la aplicación.
 */
export class Product {
  public readonly id: string;
  private readonly sku: string;
  public readonly price: number;
  public title: string;
  public partNumber?: ProductPartNumber[];
  public description: string;
  public images: string[];
  public category: ProductCategory;
  public marca: string;
  public stock: number;
  public availability: ProductAvailability;
  public submitDate: Date | null;
  public favorite?: boolean;
  public onSale?: boolean;
  public guaranteeDays?: number;
  public estimatedArrivalDate?: Date | null;
  constructor({
    title,
    partNumber,
    sku,
    price,
    description,
    images,
    category,
    marca,
    stock,
    availability,
    submitDate,
    favorite,
    onSale,
    guaranteeDays,
    estimatedArrivalDate,
  }: {
    title: string;
    partNumber?: ProductPartNumber[];
    sku: string;
    price: number;
    description: string;
    images: string[];
    category: ProductCategory;
    marca: string;
    stock: number;
    availability?: ProductAvailability;
    submitDate: Date | null;
    favorite?: boolean;
    onSale?: boolean;
    guaranteeDays?: number;
    estimatedArrivalDate?: Date | null;
  }) {
    this.id = uuid();
    this.partNumber = partNumber;
    this.sku = sku;
    this.price = price;
    this.title = title;
    this.description = description;
    this.images = images;
    this.category = category;
    this.marca = marca;
    this.stock = stock;
    this.availability = availability || "out_of_stock";
    this.submitDate = submitDate;
    this.favorite = favorite;
    this.onSale = onSale;
    this.guaranteeDays = guaranteeDays;
    this.estimatedArrivalDate = estimatedArrivalDate;
    this.validate();
  }

  public getId() {
    return this.id;
  }

  public getSku() {
    return this.sku;
  }

  public getPrice() {
    return this.price;
  }

  public changeTitle(newTitle: string) {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    this.title = newTitle;
  }

  public changeDescription(newDescription: string) {
    this.description = newDescription;
  }

  public changeImages(newImages: string[]) {
    this.images = newImages;
  }

  public changeStock(newStock: number) {
    if (newStock < 0) {
      throw new Error("Stock cannot be negative");
    }
    this.stock = newStock;
  }
  public changeSubmitDate(newDate: Date) {
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
      throw new Error("SubmitDate must be a valid date");
    }
    this.submitDate = newDate;
  }

  public toPlainObject(): ProductType {
    return ProductClassToObj(this);
  }

  private validate() {
    if (!this.id) {
      throw new Error("No id found");
    }
    if (this.price <= 0) {
      throw new Error("Price must be a positive number");
    }
    if (this.stock < 0) {
      throw new Error("Stock cannot be negative");
    }
    if (this.guaranteeDays && this.guaranteeDays < 0) {
      throw new Error("Guarantee days cannot be negative");
    }

    // if (
    //   !this.title ||
    //   (this.title.trim().length === 0 &&
    //     !this.description &&
    //     !this.price &&
    //     !this.sku)
    // ) {
    //   throw new Error("Title cannot be empty");
    // }
  }
}

export type ProductType = {
  id: string;
  sku: string;
  partNumber?: ProductPartNumber[];
  partNumberToSend?: string;
  price: number;
  title: string;
  description: string;
  images: any[];
  category: ProductCategory;
  marca: string;
  stock: number;
  availability: ProductAvailability;
  submitDate: Date | null;
  favorite?: boolean;
  onSale?: boolean;
  guaranteeDays?: number;
  estimatedArrivalDate?: Date | null;
};

export type ProductPartNumber = {
  partNumber: string;
  ean: number;
  units_x_box: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  code: string;

  subCategories?: ProductCategory[];
};

export type ProductAvailability =
  | "in_stock"
  | "out_of_stock"
  | "pre_order"
  | "on_demand";
