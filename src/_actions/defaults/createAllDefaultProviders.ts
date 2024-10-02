import { defaultProviders } from "../../providers/defaultProviders";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProvider = (name: string, contact: string, direction: string) => {
  const provider = prisma.provider.create({
    data: {
      name,
      contact,
      direction,
    },
  });
  return provider;
};

export default async function createAllDefaultProviders() {
  const providers = defaultProviders.map((provider) => {
    return createProvider(provider.name, provider.contact, provider.direction);
  });
  await Promise.all(providers);
  console.log("Providers created successfully");
  console.log("Providers:", providers);
}
