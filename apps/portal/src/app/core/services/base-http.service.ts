import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { buildHttpParams, type ParamValue } from '../utils/http-params.utils';

/**
 * Servicio base que provee utilidades HTTP comunes.
 *
 * Cada servicio concreto extiende esta clase y define sus propios métodos
 * con las rutas específicas de la API.
 *
 * @example
 * ```ts
 * @Injectable({ providedIn: 'root' })
 * export class PagosService extends BaseHttpService {
 *   getPagos(params?: BaseQueryParams): Observable<PaginatedResponse<Pago>> {
 *     return this.get<PaginatedResponse<Pago>>(API_ENDPOINTS.pagos.lista, { ... });
 *   }
 * }
 * ```
 */
export abstract class BaseHttpService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.apiUrl;

  protected get<T>(path: string, params?: Record<string, ParamValue>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params: buildHttpParams(params ?? {}),
    });
  }

  protected post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T = void>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
