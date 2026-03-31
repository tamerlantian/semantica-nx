import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, BaseQueryParams, PaginatedResponse } from '../../../core';
import { Credito } from '../models/credito.model';

@Injectable({ providedIn: 'root' })
export class CreditosService extends BaseHttpService {
  getCreditos(params?: BaseQueryParams): Observable<PaginatedResponse<Credito>> {
    return this.get<PaginatedResponse<Credito>>('/rhu/credito/lista-portal', {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }
}
