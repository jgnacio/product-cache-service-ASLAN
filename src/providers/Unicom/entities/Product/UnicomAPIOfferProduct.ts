/**
 * TArticulo, Schema for type Model.UserData.TArticulo
 */
export interface UnicomAPIOfferProduct {
  codigo?: string;
  dado_de_baja?: boolean;
  datos_ultimo_partnumber?: TDatosPartNumber;
  descripcion?: string;
  disponibilidad?: TformatoDisponibilidadInventario;
  encargado_garantia?: string;
  favorito?: boolean;
  /**
   * fecha estimada de ingreso. Formato ISO 8601
   */
  fecha_estimada_llegada?: string;
  garantia_dias?: number;
  grupo_articulo?: TgrupoArticulos;
  inventario?: number;
  link_especificaciones?: string;
  marca?: TMarca;
  peso_y_medidas_aprox?: TpesoYMedidas;
  precio?: number;
  precio_bonificado?: number;
  producto?: string;
  tags_de_busqueda?: string[];
  tiene_dctos_x_cantidad?: boolean;
  valor_billete_rma?: number;
  [property: string]: any;
}

/**
 * TDatos_PartNumber, Schema for type Model.UserData.TDatos_PartNumber
 */
export interface TDatosPartNumber {
  ean?: number;
  partnumber?: any;
  unidadesXCaja?: number;
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

/**
 * Tgrupo_articulos, Schema for type Model.UserData.Tgrupo_articulos
 */
export interface TgrupoArticulos {
  codigoGrupo?: string;
  descripcion?: string;
  /**
   * no incluido en formato plano
   */
  gruposHijos?: TgrupoArticulos[];
  [property: string]: any;
}

/**
 * TMarca, Schema for type Model.UserData.TMarca
 */
export interface TMarca {
  codigoMarca?: number;
  marca?: any;
  url?: any;
  [property: string]: any;
}

/**
 * Tpeso_y_medidas, Schema for type Model.UserData.Tpeso_y_medidas
 */
export interface TpesoYMedidas {
  alto?: number;
  ancho?: number;
  largo?: number;
  peso?: number;
  unidadMedida?: string;
  unidadPeso?: string;
  unidades?: number;
  [property: string]: any;
}
