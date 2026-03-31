import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constants';
import { UpdatePerfilRequest } from '../models/perfil.model';

@Injectable({ providedIn: 'root' })
export class PerfilService extends BaseHttpService {
  updatePerfil(data: UpdatePerfilRequest): Observable<void> {
    return this.patch<void>(API_ENDPOINTS.perfil.update, data);
  }
}
