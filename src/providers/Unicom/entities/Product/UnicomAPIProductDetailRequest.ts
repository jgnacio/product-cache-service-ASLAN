export interface UnicomAPIProductDetailRequest {
  resolucion_fotos?: TresolucionesFotos;
  [property: string]: any;
}

/**
 * Tresoluciones_fotos
 */
export enum TresolucionesFotos {
  Resolucion1200X1200 = "resolucion_1200x1200",
  Resolucion150X150 = "resolucion_150x150",
  Resolucion400X400 = "resolucion_400x400",
  SinFotos = "sin_fotos",
}
