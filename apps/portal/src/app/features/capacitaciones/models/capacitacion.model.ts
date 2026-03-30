export interface Capacitacion {
  codigo_capacitacion_pk: number;
  codigo_empleado_fk: number;
  nombre: string;
  tipo: string;
  instructor: string;
  fecha_desde: string;
  fecha_hasta: string;
  horas: number;
  estado: string;
}
