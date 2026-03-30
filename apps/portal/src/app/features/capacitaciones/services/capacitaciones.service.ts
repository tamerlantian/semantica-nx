import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, BaseQueryParams, PaginatedResponse } from '../../../core';
import { Capacitacion } from '../models/capacitacion.model';

@Injectable({ providedIn: 'root' })
export class CapacitacionesService extends BaseHttpService {
  getCapacitaciones(params?: BaseQueryParams): Observable<PaginatedResponse<Capacitacion>> {
    return this.get<PaginatedResponse<Capacitacion>>('/rhu/capacitacion/lista-portal', {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
