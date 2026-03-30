export interface Credito {
  codigo_credito_pk: number;
  codigo_empleado_fk: number;
  tipo: string;
  vr_solicitado: number;
  vr_cuota: number;
  num_cuotas: number;
  vr_saldo: number;
  fecha_solicitud: string;
  estado: string;
}
