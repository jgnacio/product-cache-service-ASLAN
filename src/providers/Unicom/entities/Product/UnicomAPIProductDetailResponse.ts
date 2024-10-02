/**
 * TArticulo_completo, Schema for type Model.UserData.TArticulo_completo
 */
export interface UnicomAPIProductDetailResponse {
  /**
   * artículos que tenemos relacionados. En los datos de relación está el campo que los
   * relaciona (memoria, color, etc)
   */
  articulos_relacionados?: ArticulosRelacionado[];
  /**
   * codigo artículo de Unicom
   */
  codigo?: string;
  /**
   * si es true, fue dado de baja
   */
  dado_de_baja?: boolean;
  /**
   * Datos para publicar en MercadoLibre
   */
  datos_mercado_libre: DatosMercadoLibre;
  /**
   * partnumbers del artículo. Puede haber mas de uno en el mismo artículo. Se ingresan en
   * formato de pila
   */
  datos_partnumbers?: TDatosPartNumber[];
  /**
   * descuentos adicionales
   */
  dctos_x_cantidad?: TDctoXCantidad[];
  descripcion?: string;
  /**
   * Disponibilidad
   */
  disponibilidad?: TformatoDisponibilidadInventario;
  /**
   * unidades que ya se tienen en el carrito del usuario
   */
  en_carrito?: number;
  encargado_garantia?: string;
  /**
   * es true si está rematandose. En este caso el precio y precio bonificado se verían
   * afectados
   */
  esta_en_remate?: boolean;
  /**
   * el cliente lo tiene como favorito
   */
  favorito?: boolean;
  /**
   * Si está en transito. Incluye la fecha estimada de llegada
   */
  fecha_estimada_llegada?: string;
  /**
   * fotos en base64
   */
  fotos?: TFoto[];
  garantia_dias?: number;
  grupo_articulo?: TgrupoArticulos;
  /**
   * Unidades disponibles.
   */
  inventario?: number;
  /**
   * Link en la web del fabricante
   */
  link_especificaciones?: string;
  links_videos?: TLinkVideoArticulo[];
  marca?: TMarca;
  nombre_pm?: string;
  /**
   * pesos y medidas del artícuo. Pero son referenciales, ya que depende como se embale
   */
  peso_y_medidas_aprox?: TpesoYMedidas;
  /**
   * precio sin impuestos
   */
  precio?: number;
  /**
   * precio bonificado sin impuestos. Precio de vta del momento
   */
  precio_bonificado?: number;
  /**
   * nombre
   */
  producto?: string;
  tabla_especificaciones?: string;
  tags_de_busqueda?: string[];
  /**
   * importe del billete de RMA impuestos incluidos
   */
  valor_billete_rma?: number;
  [property: string]: any;
}

export interface ArticulosRelacionado {
  codigo?: string;
  disponibilidad?: TformatoDisponibilidadInventario;
  en_carrito?: number;
  esta_en_remate?: boolean;
  precio?: number;
  producto?: string;
  /**
   * relaciones del artículo. Puede tener mas de un aspecto que lo relacione.
   */
  relacion?: TDefRelacionArticulos;
  tiene_dctos_x_cantidad?: boolean;
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
  codigo_relacion?: number;
  nombre_relacion?: string;
  valor_relacion?: string;
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
  category_id: string;
  descripcion: string;
  nombre: string;
  [property: string]: any;
}

export interface Atributo {
  /**
   * ID de atributo de MELI
   */
  id_atributo: string;
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
  precio_unitario?: number;
  /**
   * si es true. El descuento se realiza por caja cerrada, en caso contrario por cantidad de
   * unidades
   */
  x_caja?: boolean;
  [property: string]: any;
}

/**
 * TFoto, Schema for type Model.UserData.TFoto
 */
export interface TFoto {
  formato?: string;
  foto_base64?: string;
  resolucion?: string;
  [property: string]: any;
}

/**
 * Tgrupo_articulos, Schema for type Model.UserData.Tgrupo_articulos
 */
export interface TgrupoArticulos {
  codigo_grupo?: string;
  descripcion?: string;
  /**
   * no incluido en formato plano
   */
  grupos_hijos?: TgrupoArticulos[];
  [property: string]: any;
}

/**
 * TLink_Video_Articulo, Schema for type Model.UserData.TLink_Video_Articulo
 */
export interface TLinkVideoArticulo {
  link_video?: string;
  nombre_referencial?: string;
  [property: string]: any;
}

/**
 * TMarca, Schema for type Model.UserData.TMarca
 */
export interface TMarca {
  codigo_marca?: number;
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
  unidad_medida?: string;
  unidad_peso?: string;
  unidades?: number;
  [property: string]: any;
}
