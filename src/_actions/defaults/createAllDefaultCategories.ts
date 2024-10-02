import { defaultUnicomAPIRelevantCategories } from "../../providers/Unicom/UnicomAPIRequets";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Función para crear y listar categorías
export const createAndListCategories = async () => {
  try {
    // Inserta todas las categorías en la base de datos
    await Promise.all(
      defaultUnicomAPIRelevantCategories.map(async (category) => {
        await prisma.category.create({
          data: {
            name: category.name,
            nameES: category.nameES,
            code: category.code,
          },
        });
      })
    );

    // Lista todas las categorías después de la creación
    const categories = await prisma.category.findMany();
    console.log("Categorías creadas:", categories);
  } catch (error) {
    console.error("Error creando categorías:", error);
  } finally {
    await prisma.$disconnect();
  }
};
