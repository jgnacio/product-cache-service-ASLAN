/**
 * Tgrupo_articulos, Schema for type Model.UserData.Tgrupo_articulos
 */
export interface UnicomAPICategory {
  codigo_grupo?: string;
  descripcion?: string;
  /**
   * no incluido en formato plano
   */
  grupos_hijos?: UnicomAPICategory[];
  [property: string]: any;
}
