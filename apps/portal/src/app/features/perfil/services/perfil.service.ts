import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { PerfilDetalle, UpdatePerfilRequest } from '../models/perfil.model';

@Injectable({ providedIn: 'root' })
export class PerfilService extends BaseHttpService {
  getDetalle(): Observable<PerfilDetalle> {
    return this.get<PerfilDetalle>(API_ENDPOINTS.perfil.detalle);
  }

  updatePerfil(data: UpdatePerfilRequest): Observable<void> {
    return this.put<void>(API_ENDPOINTS.perfil.update, data);
  }
}
