import { create } from "domain";
import { createAndListCategories } from "./_actions/defaults/createAllDefaultCategories";
import { ProductType } from "./domain/product/entities/Product";
import { createProduct, getAllProducts } from "./Utils/Functions/ProductDB";
import { HttpFunction } from "@google-cloud/functions-framework";
import createAllDefaultProviders from "./_actions/defaults/createAllDefaultProviders";

const PASSWORD_FUNCTION = process.env.PASSWORD_FUNCTION;

// console.log(
//   "Iniciando ejecución programada.\nSe ejecutará cada 12 horas empezando a las 11:00AM.\n"
// );

// createAndListCategories();
// createAllDefaultProviders();

const main = async () => {
  // // 1. Obtener todos los productos
  let products: ProductType[] = [];
  products = await getAllProducts();
  if (products.length === 0) {
    console.log("No products found, exiting");
    throw new Error("No products found");
  }
  console.log("Products", products.length);
  for (const product of products) {
    await createProduct(product);
  }
};

// main();

export const hello: HttpFunction = async (req, res) => {
  // Configura que sea Post y que tenga que enviar una contraseña para poder ejecutar la función
  if (req.method !== "POST") {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.body.password === PASSWORD_FUNCTION) {
    // Ejectuar la función principal y manejo de errores
    try {
      await main();
      res.send("Hello, World!");
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Error");
    }
  }
  res.status(401).send("Unauthorized");
  return;
};
