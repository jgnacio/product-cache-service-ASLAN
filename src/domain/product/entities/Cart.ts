import { Product, ProductCategory, ProductType } from "./Product";
import { v4 as uuid } from "uuid";
export class Cart {
  private static instance: Cart;
  public readonly id: string;
  public userId: string;
  public lastUpdate: Date;
  public total: number;
  public products: CartProduct[];
  public delivery_options: [];
  public payment_options: [];
  public total_including_tax: number;
  constructor() {
    this.id = uuid();
    // TODO GET USER ID FROM CLERK
    this.userId = "";
    this.products = [];
    this.lastUpdate = new Date();
    this.total = this.products.length;
    this.delivery_options = [];
    this.payment_options = [];
    this.total_including_tax = 0;
  }

  public static getInstance(): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
  }

  public getProductById(id: string) {
    // get the sku
    const product = this.products.find((product) => product.getSku() === id);
    return product;
  }

  public addProduct(product: CartProduct) {
    this.products.push(product);
    this.total += product.price;
  }

  public removeProduct(id: string) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.total -= this.products[index].price;
    }
  }

  // public toPlainObject(): CartState {
  //   const products = this.products.map((product) => product.toPlainObject());
  //   return {
  //     id: this.id,
  //     userId: this.userId,
  //     lastUpdate: this.lastUpdate.toISOString(),
  //     total: this.total,
  //     products,
  //   };
  // }

  public clear() {
    this.products = [];
    this.total = 0;
  }

  public getTotal() {
    return this.total;
  }

  public getProducts() {
    return this.products;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public getUserId() {
    return this.userId;
  }

  public getId() {
    return this.id;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public setLastUpdate(lastUpdate: Date) {
    this.lastUpdate = lastUpdate;
  }

  public setProducts(products: CartProduct[]) {
    this.products = products;
    this.refreshTotal();
  }

  public setPlainProducts(products: ProductType[]) {
    this.products = products.map((product) => new Product(product));
    this.refreshTotal();
  }

  public addProducts(products: CartProduct[]) {
    // if not exists add the products
    products.map((product) => {
      if (!this.products.find((p) => p.id === product.id)) {
        this.products.push(product);
      }
    });
    this.refreshTotal();
  }

  public updateProduct(id: string) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = this.products[index];
      this.refreshTotal();
    }
  }

  public toPlainObject(): CartType {
    return {
      id: this.id,
      userId: this.userId,
      lastUpdate: this.lastUpdate.toISOString(),
      total: this.total,
      products: this.products.map((product) => product.toPlainObject()),
      delivery_options: this.delivery_options,
      payment_options: this.payment_options,
      total_including_tax: this.total_including_tax,
    };
  }

  public refreshTotal() {
    this.total = this.products.reduce((acc, product) => acc + product.price, 0);
  }
}

export class CartControler {
  constructor(
    public readonly id: string,
    public userId: string,
    public lastUpdate: Date,
    public total: number,
    public carts: Cart[]
  ) {}

  public addCart(cart: Cart) {
    this.carts.push(cart);

    // iter the carts and get the total
    this.carts.map((cart) => {
      this.total += cart.getTotal();
    });
  }

  public deleteCart(cart: Cart) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts.splice(index, 1);
      this.total -= cart.getTotal();
    }
  }

  public updateCart(cart: Cart) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts[index] = cart;
    }
  }

  public addProduct(cart: Cart, product: Product) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts[index].addProduct(product);
    }
  }

  public removeProduct(cart: Cart, product: Product) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts[index].removeProduct(product.id);
    }
  }

  public updateProduct(cart: Cart, product: Product) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts[index].updateProduct(product.id);
    }
  }

  public clear() {
    this.carts = [];
    this.total = 0;
  }

  public getTotal() {
    return this.total;
  }

  public getCarts() {
    return this.carts;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public getUserId() {
    return this.userId;
  }
}

export interface ICartProduct extends ProductType {
  available?: string;
  tax?: number;
  quantity?: number;
}

export interface ICart {
  id: string;
  userId: string;
  lastUpdate: string;
  total: number;
  products: ICartProduct[];
  delivery_options: [];
  payment_options: [];
  total_including_tax: number;
}

export type CartType = {
  id: string;
  userId: string;
  lastUpdate: string;
  total: number;
  products: CartProductType[];
  delivery_options: [];
  payment_options: [];
  total_including_tax: number;
};

export type CartProductType = ProductType & {
  available?: string;
  tax?: number;
  quantity?: number;
};

export class CartProduct extends Product {
  public readonly id: string;
  available?: string;
  tax?: number;
  quantity?: number;

  constructor({
    available,
    tax,
    quantity,
    ...product
  }: {
    available?: string;
    tax?: number;
    quantity?: number;
    sku: string;
    price: number;
    title: string;
    description: string;
    images: string[];
    category: ProductCategory;
    marca: string;
    stock: number;
    submitDate: Date | null;
    favorite?: boolean;
    onSale?: boolean;
    guaranteeDays?: number;
    estimatedArrivalDate?: Date | null;
  }) {
    super(product);
    this.id = uuid();
    this.available = available;
    this.tax = tax;
    this.quantity = quantity;
  }

  toPlainObject(): CartProductType {
    const productObject = super.toPlainObject();
    return {
      ...productObject,
      available: this.available,
      tax: this.tax,
      quantity: this.quantity,
    };
  }
}

// export interface Cart {
//   id: string;
//   userId: string;
//   lastUpdate: string;
//   total: number;
//   products: CartProduct[];
//   delivery_options: [];
//   payment_options: [];
//   total_including_tax: number;
// }
