/**
 * TCombo, Schema for type Model.UserData.TCombo
 */
export interface UnicomAPIOfferCombo {
  /**
   * artículos que componen la orferta
   */
  articulos?: TComboArticulo[];
  codigo_oferta?: string;
  costo?: number;
  costo_bonificado?: number;
  disponibilidad?: TformatoDisponibilidadInventario;
  en_carrito?: number;
  fecha_fin?: string;
  fecha_inicio?: string;
  nombre_oferta?: string;
  [property: string]: any;
}

/**
 * TCombo_Articulo, Schema for type Model.UserData.TCombo_Articulo
 */
export interface TComboArticulo {
  codigoArticulo?: string;
  descripcion?: string;
  garantia?: number;
  [property: string]: any;
}

/**
 * Tformato_disponibilidad_inventario
 */
export enum TformatoDisponibilidadInventario {
  ConInventario = "con_inventario",
  Consultar = "consultar",
  SinInventario = "sin_inventario",
}
