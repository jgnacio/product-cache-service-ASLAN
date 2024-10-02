/**
 * TEquipo, Schema for type Model.UserData.TEquipo
 */
export interface UnicomAPIPreAssembledPC {
  articulos?: TEquipoArticulo[];
  codigo_equipo?: string;
  costo?: number;
  costo_bonificado?: number;
  disponibilidad?: TformatoDisponibilidadInventario;
  en_carrito?: number;
  nombre_equipo?: string;
  [property: string]: any;
}

/**
 * TEquipo_Articulo, Schema for type Model.UserData.TEquipo_Articulo
 */
export interface TEquipoArticulo {
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
