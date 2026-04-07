import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../tokens';
import { Fichero } from '../models/fichero.model';

@Injectable({ providedIn: 'root' })
export class FicherosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(ENVIRONMENT).apiUrl;

  getFicheros(codigoModelo: string, codigo: string): Observable<Fichero[]> {
    return this.http.get<Fichero[]>(
      `${this.baseUrl}/doc/fichero/modelo/${codigoModelo}/${codigo}`,
    );
  }

  cargarFichero(
    codigoModelo: string,
    recordId: number | string,
    file: File,
  ): Observable<unknown> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post(
      `${this.baseUrl}/doc/fichero/cargar/${codigoModelo}/${recordId}`,
      formData,
    );
  }

  descargarFichero(pk: number): void {
    this.http
      .get<{ url: string }>(`${this.baseUrl}/doc/fichero/descargar-url/${pk}`)
      .subscribe(({ url }) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      });
  }
}
