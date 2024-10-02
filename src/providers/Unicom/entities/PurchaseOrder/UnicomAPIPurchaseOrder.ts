import { DropShippingDelivery } from "../../UnicomAPIRequets";
import { Time } from "@internationalized/date";

export interface DropShippingDeliveryState
  extends Omit<
    DropShippingDelivery,
    "hora_cierre" | "hora_entrega" | "hora_fin"
  > {
  hora_cierre: Time;
  hora_entrega: Time;
  hora_fin: Time;
}

export const document_types = [
  {
    label: "Cédula de identidad",
    value: "CI",
  },
  {
    label: "DNI",
    value: "DNI",
  },
  {
    label: "Pasaporte",
    value: "pasaporte",
  },
  {
    label: "Otro documento",
    value: "otro_documento",
  },
];

export const regularDeliveryMethods = [
  {
    label: "Entrega en mostrador",
    value: "entrega_en_mostrador",
  },
  {
    label: "Flete fast",
    value: "flete_fast",
  },
  {
    label: "Flete Regular",
    value: "flete_regular",
  },
  {
    label: "Flete Interior",
    value: "flete_interior",
  },
];
