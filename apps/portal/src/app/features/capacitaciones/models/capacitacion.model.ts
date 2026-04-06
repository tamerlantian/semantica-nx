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

export interface CapacitacionDetalle {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  instructor: string;
  fecha_inicio: string;
  fecha_fin: string;
  duracion_horas: number;
  estado: string;
  progreso: number;
  modalidad: string;
  lugar: string;
}
