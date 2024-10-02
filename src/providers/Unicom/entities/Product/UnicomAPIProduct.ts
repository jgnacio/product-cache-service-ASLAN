/**
 * TArticulo_completo, Schema for type Model.UserData.TArticulo_completo
 */
export interface UnicomAPIProduct {
  codigo?: string;
  /**
   * es true si este artículo fue dado de baja
   */
  dado_de_baja?: boolean;
  datos_ultimo_partnumber?: TDatosPartNumber;
  descripcion?: string;
  disponibilidad?: TformatoDisponibilidadInventario;
  encargado_garantia?: string;
  /**
   * es true si esta configurado como favorito en el cliente
   */
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
  /**
   * pesos y medidas aproximadas del artículo.
   */
  peso_y_medidas_aprox?: TpesoYMedidas;
  /**
   * precio regular sin impuestos. Los precios pueden variar
   */
  precio?: number;
  /**
   * mejor precio sin impuestos y al que compraría en el momento. Los precios pueden variar
   */
  precio_bonificado?: number;
  producto?: string;
  tags_de_busqueda?: string[];
  tiene_dctos_x_cantidad?: boolean;
  valor_billete_rma?: number;
  [property: string]: any;
}

export interface ArticulosRelacionado {
  codigo?: string;
  disponibilidad?: TformatoDisponibilidadInventario;
  enCarrito?: number;
  estaEnRemate?: boolean;
  precio?: number;
  producto?: string;
  /**
   * relaciones del artículo. Puede tener mas de un aspecto que lo relacione.
   */
  relacion?: TDefRelacionArticulos;
  tieneDctosXCantidad?: boolean;
  [property: string]: any;
}

/**
 * Tformato_disponibilidad_inventario
 *
 * Disponibilidad
 */
export enum TformatoDisponibilidadInventario {
  ConInventario = "con_inventario",
  Consultar = "consultar",
  SinInventario = "sin_inventario",
}

/**
 * relaciones del artículo. Puede tener mas de un aspecto que lo relacione.
 *
 * TDef_Relacion_Articulos, Schema for type Model.UserData.TDef_Relacion_Articulos
 */
export interface TDefRelacionArticulos {
  codigoRelacion?: number;
  nombreRelacion?: string;
  valorRelacion?: string;
  [property: string]: any;
}

/**
 * Datos para publicar en MercadoLibre
 */
export interface DatosMercadoLibre {
  /**
   * atributos
   */
  atributos: Atributo[];
  /**
   * ID de la categoría de MELI
   */
  categoryid: string;
  descripcion: string;
  nombre: string;
  [property: string]: any;
}

export interface Atributo {
  /**
   * ID de atributo de MELI
   */
  idAtributo: string;
  valor: string;
  [property: string]: any;
}

/**
 * TDatos_PartNumber, Schema for type Model.UserData.TDatos_PartNumber
 */
export interface TDatosPartNumber {
  ean?: number;
  partnumber?: any;
  unidades_x_caja?: number;
  [property: string]: any;
}

/**
 * TDcto_X_Cantidad, Schema for type Model.UserData.TDcto_X_Cantidad
 */
export interface TDctoXCantidad {
  cantidad?: number;
  /**
   * precio unitario mas impuestos
   */
  precioUnitario?: number;
  /**
   * si es true. El descuento se realiza por caja cerrada, en caso contrario por cantidad de
   * unidades
   */
  xCaja?: boolean;
  [property: string]: any;
}

/**
 * TFoto, Schema for type Model.UserData.TFoto
 */
export interface TFoto {
  formato?: string;
  fotoBase64?: string;
  resolucion?: string;
  [property: string]: any;
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
 * TLink_Video_Articulo, Schema for type Model.UserData.TLink_Video_Articulo
 */
export interface TLinkVideoArticulo {
  linkVideo?: string;
  nombreReferencial?: string;
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
 * pesos y medidas del artícuo. Pero son referenciales, ya que depende como se embale
 *
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
