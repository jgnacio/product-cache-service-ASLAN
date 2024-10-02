/**
 * TReturn_Alta_Orden, Schema for type Model.UserData.TReturn_Alta_Orden
 */
export interface PurchaseOrder {
  /**
   * Orden departamento técnico
   */
  id_codrep_con_stock?: string;
  /**
   * Orden departamento técnico en remate
   */
  id_codrep_remate?: string;
  /**
   * Orden departamento técnico sin stock
   */
  id_codrep_sin_stock?: string;
  /**
   * Orden con stock
   */
  id_orden_con_stock?: string;
  /**
   * Orden en remate
   */
  id_orden_remate?: string;
  /**
   * Orden en backorder. Sin disponiblidad
   */
  id_orden_sin_stock?: string;
  [property: string]: any;
}
