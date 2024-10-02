import { z } from "zod";

export const schemaPublishProduct = z.object({
  title: z.string(),
  price: z.number().gt(0),
  description: z.string(),
  images: z.array(
    z.object(
      { src: z.string().optional(), id: z.number() } || {
        src: z.string(),
        id: z.number().optional(),
      }
    )
  ),
  //   category: z.object({
  //     id: z.string(),
  //     name: z.string(),
  //   }),
  //   marca: z.string(),
  //   stock: z.number(),
  //   submitDate: z.date().nullable(),
  //   favorite: z.boolean().optional(),
  //   onSale: z.boolean().optional(),
  //   guaranteeDays: z.number().optional(),
  //   estimatedArrivalDate: z.date().nullable().optional(),
});
