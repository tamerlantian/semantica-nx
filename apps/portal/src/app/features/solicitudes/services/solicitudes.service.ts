import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, BaseQueryParams, PaginatedResponse } from '../../../core';
import {
  CreateSolicitudRequest,
  SolicitudEmpleado,
  SolicitudEmpleadoTipo,
} from '../models/solicitud.model';
import { Fichero } from '../models/fichero.model';

@Injectable({ providedIn: 'root' })
export class SolicitudesService extends BaseHttpService {
  getSolicitudes(params?: BaseQueryParams): Observable<PaginatedResponse<SolicitudEmpleado>> {
    return this.get<PaginatedResponse<SolicitudEmpleado>>('/rhu/solicitud_empleado/lista', {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }

  getTipos(nombre?: string): Observable<PaginatedResponse<SolicitudEmpleadoTipo>> {
    return this.get<PaginatedResponse<SolicitudEmpleadoTipo>>(
      '/rhu/solicitud_empleado_tipo/lista',
      {
        page: 1,
        size: 50,
        nombre,
      },
    );
  }

  crearSolicitud(body: CreateSolicitudRequest): Observable<SolicitudEmpleado> {
    return this.post<SolicitudEmpleado>('/rhu/solicitud_empleado/nuevo', body);
  }

  getFicherosByModelo(codigoModelo: string, codigo: string): Observable<Fichero[]> {
    return this.get<Fichero[]>(`/doc/fichero/modelo/${codigoModelo}/${codigo}`);
  }

  cargarFichero(solicitudId: number, file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post(
      `${this.baseUrl}/doc/fichero/cargar/RhuSolicitudEmpleado/${solicitudId}`,
      formData,
      { withCredentials: true },
    );
  }
}
