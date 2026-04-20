import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@semantica/core';
import { Observable } from 'rxjs';
import { ContactoRequest } from '../models/contacto.model';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);

  private readonly CONTACTO_PATH = '/contacto/nuevo';

  enviarContacto(payload: ContactoRequest): Observable<void> {
    return this.http.post<void>(`${this.env.marketingApiUrl}${this.CONTACTO_PATH}`, payload);
  }
}
