import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService, PaginatedResponse } from '../../../../core';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints.constants';
import { Enlace } from '../models/enlace.model';

@Injectable({ providedIn: 'root' })
export class EnlacesService extends BaseHttpService {
  /** Obtiene la lista de enlaces disponibles. */
  getEnlaces(): Observable<Enlace[]> {
    return this.get<PaginatedResponse<Enlace>>(API_ENDPOINTS.enlaces.lista).pipe(
      map((res) => res.items),
    );
  }
}
