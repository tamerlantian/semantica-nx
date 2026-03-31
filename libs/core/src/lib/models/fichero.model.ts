export interface Fichero {
  codigo_fichero_pk: number;
  codigo_fichero_tipo_fk: string;
  codigo_modelo_fk: string;
  codigo: string;
  fecha: string;
  nombre: string;
  extension: string;
  tipo: string;
  ui: string;
  comprimido: boolean;
  tamano: number;
  usuario: string;
  directorio_base: string;
  error_carga: boolean;
}
