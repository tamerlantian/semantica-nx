export interface PerfilDetalle {
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
  empleado_id: number;
  email: string;
}

export interface UpdatePerfilRequest {
  nombres: string;
  apellidos: string;
  numero_identificacion: string;
}
