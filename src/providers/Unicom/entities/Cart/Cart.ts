export interface UnicomAPICart {
  /**
   * Lista de artículos, combos, equipos pre-stamados que componen el carrito
   */
  articulos?: TArticuloCarrito[];
  /**
   * Forma de pago disponible para pagar el carrito
   */
  forma_de_pago?: TFormaPagoCarrito;
  /**
   * Opciones de entrega disponibles para el carrito
   */
  opciones_entrega?: OpcionesEntrega;
  /**
   * total del carrito con impuestos incluidos.
   */
  total_con_impuestos?: number;
  [property: string]: any;
}

/**
 * TArticulo_Carrito
 */
export interface TArticuloCarrito {
  cantidad?: number;
  codigo_articulo?: string;
  costo_unitario?: number;
  descripcion?: string;
  disponibilidad?: TformatoDisponibilidadInventario;
  esta_rematandose?: boolean;
  iva_unitario?: number;
  tiene_ing_depto_tecnico?: boolean;
  tipo_articulo?: TtiposArticulos;
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
 * Ttipos_articulos
 */
export enum TtiposArticulos {
  Articulo = "articulo",
  Desconocido = "desconocido",
  Equipo = "equipo",
  Oferta = "oferta",
}

/**
 * Forma de pago disponible para pagar el carrito
 *
 * tForma_pago_carrito, formas de pago disponibles para el carrito
 */
export interface TFormaPagoCarrito {
  forma_de_pago_cliente?: TFormaDePagoCliente;
  tiene_credito_para_entregar_carrito?: boolean;
  [property: string]: any;
}

/**
 * TForma_de_pago_cliente, Schema for type Model.UserData.TForma_de_pago_cliente
 */
export interface TFormaDePagoCliente {
  credito_disponible?: number;
  forma_de_pago?: TFormaPago;
  limite_credito?: number;
  [property: string]: any;
}

/**
 * TForma_Pago
 */
export enum TFormaPago {
  PagoChequeContraEntrega = "pago_cheque_contra_entrega",
  PagoConforme = "pago_conforme",
  PagoContado = "pago_contado",
  PagoCuentaCorriente = "pago_cuenta_corriente",
}

/**
 * Opciones de entrega disponibles para el carrito
 */
export interface OpcionesEntrega {
  /**
   * Direcciones de sucursales con sus metodos de entrega y horarios disponibles
   */
  direcciones_entrega?: TDireccionEntrega[];
  /**
   * modalidades de DropShipping disponibles
   */
  opciones_dropshipping?: OpcionesDropshipping[];
  [property: string]: any;
}

/**
 * TDireccion_Entrega, Schema for type Model.UserData.TDireccion_Entrega
 */
export interface TDireccionEntrega {
  ciudad?: string;
  codigo_direccion?: number;
  codigo_postal?: string;
  departamento?: string;
  direccion?: string;
  pais?: string;
  tipos_flete_validos?: TFlete[];
  [property: string]: any;
}

/**
 * TFlete, Schema for type Model.UserData.TFlete
 */
export interface TFlete {
  costo?: number;
  descripcion?: string;
  minima_compra_para_flete?: number;
  minima_compra_para_no_tener_costo?: number;
  proximas_franjas_horarias_de_entrega?: TProximaFranjaHorariaDeEntrega[];
  tipo_flete?: number;
  zona?: string;
  [property: string]: any;
}

/**
 * TProxima_Franja_Horaria_De_Entrega, Schema for type
 * Model.UserData.TProxima_Franja_Horaria_De_Entrega
 */
export interface TProximaFranjaHorariaDeEntrega {
  /**
   * formato ISO 8601 ej. "2024-09-21T12:31:52.000-03:00"
   */
  dia_hora_de_corte?: string;
  /**
   * formato ISO 8601 ej. "2024-09-21T12:31:52.000-03:00"
   */
  dia_hora_de_entrega?: string;
  /**
   * formato ISO 8601 ej. "2024-09-21T12:31:52.000-03:00"
   */
  fin_dia_hora_entrega?: string;
  [property: string]: any;
}

export interface OpcionesDropshipping {
  /**
   * para el caso de que sea la entrega en uun centro logístico
   */
  centro_logistico?: TCentroLogistico;
  codigo_metodo_entrega_especial?: number;
  descripcion?: string;
  /**
   * es true si la entrega se hace directamente al consumidor
   */
  entrega_al_consumidor?: boolean;
  /**
   * información que se requiere al ingresar la orden
   */
  informacion_requerida?: InformacionRequerida;
  /**
   * como se entregaría el pedido
   */
  metodo_entrega?: TOpcionesMetodosEntregaEspecial;
  /**
   * costo sin impuestos del servicio
   */
  monto_a_cobrar?: number;
  /**
   * Monto mínimo sin impuestos para poder realizar el servicio
   */
  monto_minimo?: number;
  /**
   * Monto mínimo sin impuestos para que no tenga cossto
   */
  monto_minimo_sin_costo?: number;
  /**
   * Nombre referencial del servicio DropShipping
   */
  nombre_referencial?: string;
  /**
   * horarios de entrega disponibles
   */
  proximas_franjas_horarias_de_entrega?: TProximaFranjaHorariaDeEntrega[];
  /**
   * es true cuando el servicio es "inmediato", y no se respeta la hora de corte
   */
  servicio_fast?: boolean;
  /**
   * es true si solo se puede entregar en montevideo
   */
  solo_a_montevideo?: boolean;
  [property: string]: any;
}

/**
 * para el caso de que sea la entrega en uun centro logístico
 *
 * TCentro_Logistico, Schema for type Model.UserData.TCentro_Logistico
 */
export interface TCentroLogistico {
  codigo?: number;
  /**
   * si es true el centro logístico incluye sub-operadores. Por ej. 3 cruces
   */
  incluye_operadores?: boolean;
  nombre?: string;
  [property: string]: any;
}

/**
 * información que se requiere al ingresar la orden
 */
export interface InformacionRequerida {
  /**
   * dir. consumidor final. Si es r_condcional, es requerido si no se ingresó la imágen de la
   * etiqueta
   */
  requiere_direccion?: TOpcionesRequerimientosMetodoEntregaEspecial;
  /**
   * Doc. consumidor final
   */
  requiere_documento?: TOpcionesRequerimientosMetodoEntregaEspecial;
  /**
   * Email consumidor final
   */
  requiere_email?: TOpcionesRequerimientosMetodoEntregaEspecial;
  /**
   * Enviará el código QR
   */
  requiere_envio_qr?: TOpcionesRequerimientosMetodoEntregaEspecial;
  requiere_imagen_etiqueta?: string;
  /**
   * imagen factura distribuidor
   */
  requiere_imagen_factura?: TOpcionesRequerimientosMetodoEntregaEspecial;
  /**
   * Nombre Consumidor Final
   */
  requiere_nombre?: TOpcionesRequerimientosMetodoEntregaEspecial;
  /**
   * tel consumidor Final. Si es r_condcional, es requerido si se ingresa la dirección
   */
  requiere_telefono?: TOpcionesRequerimientosMetodoEntregaEspecial;
  [property: string]: any;
}

/**
 * dir. consumidor final. Si es r_condcional, es requerido si no se ingresó la imágen de la
 * etiqueta
 *
 * TOpciones_Requerimientos_metodo_entrega_especial
 *
 * Doc. consumidor final
 *
 * Email consumidor final
 *
 * Enviará el código QR
 *
 * imagen factura distribuidor
 *
 * Nombre Consumidor Final
 *
 * tel consumidor Final. Si es r_condcional, es requerido si se ingresa la dirección
 */
export enum TOpcionesRequerimientosMetodoEntregaEspecial {
  RCondicional = "r_condicional",
  RDesconocido = "r_desconocido",
  RNoRequerido = "r_no_requerido",
  ROpcional = "r_opcional",
  RRequerido = "r_requerido",
}

/**
 * como se entregaría el pedido
 *
 * TOpciones_Metodos_entrega_especial
 */
export enum TOpcionesMetodosEntregaEspecial {
  EntregaCentroLogistico = "entrega_centro_logistico",
  EntregaDesconocida = "entrega_desconocida",
  EntregaEnLocalDistribuidor = "entrega_en_local_distribuidor",
  EntregaFleteInterior = "entrega_flete_interior",
  EntregaMostrador = "entrega_mostrador",
  EntregaTodoMontevideo = "entrega_todo_montevideo",
  EntregaZona1 = "entrega_zona_1",
  EntregaZona2 = "entrega_zona_2",
  EntregaZona3 = "entrega_zona_3",
  EntregaZona4 = "entrega_zona_4",
}
