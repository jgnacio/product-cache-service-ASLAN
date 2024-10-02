import { ProductType } from "./domain/product/entities/Product";
import { createProduct, getAllProducts } from "./Utils/Functions/ProductDB";
var cron = require("node-cron");

let ejecucionNumero = 0;
let MaximunAttempts = 6;

console.log(
  "Iniciando ejecución programada.\nSe ejecutará cada 12 horas empezando a las 11:00AM.\n"
);

// ejecutar el main cada 12 horas empezando a las 04:00
cron.schedule("0 11,22 * * *", () => {
  ejecucionNumero++; // Incrementa el contador en cada ejecución

  console.log(
    `Ejecución programada.\nHora: ${new Date().toLocaleTimeString()} \nFecha: ${new Date().toLocaleDateString()} \n\nEjecución Número: ${ejecucionNumero}`
  );

  main();
});

//   createAndListCategories();
//   createAllDefaultProviders();

const main = async () => {
  // 1. Obtener todos los productos
  let products: ProductType[] = [];

  do {
    MaximunAttempts--;
    products = await getAllProducts();

    if (products.length === 0) {
      console.log("No products found, retrying in 30 minutes");
      await new Promise((resolve) => setTimeout(resolve, 1800000));
    }
  } while (products.length === 0 && MaximunAttempts > 0);

  if (products.length === 0) {
    console.log("No products found, exiting");
    return;
  }

  console.log("Products", products.length);

  for (const product of products) {
    const newProduct = await createProduct(product);
    console.log("New Product", newProduct);
  }
};
