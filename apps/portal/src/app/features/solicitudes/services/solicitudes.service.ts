import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, BaseQueryParams, PaginatedResponse } from '../../../core';
import { SolicitudEmpleado } from '../models/solicitud.model';

@Injectable({ providedIn: 'root' })
export class SolicitudesService extends BaseHttpService {
  getSolicitudes(params?: BaseQueryParams): Observable<PaginatedResponse<SolicitudEmpleado>> {
    return this.get<PaginatedResponse<SolicitudEmpleado>>('/rhu/solicitud_empleado/lista', {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
