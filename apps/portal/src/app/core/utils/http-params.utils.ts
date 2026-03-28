import { HttpParams } from '@angular/common/http';

/** Tipo de valores aceptados para parámetros HTTP */
export type ParamValue = string | number | boolean | null | undefined;

/**
 * Construye un objeto HttpParams a partir de un record plano.
 * Los valores null/undefined son ignorados automáticamente.
 *
 * @example
 * buildHttpParams({ page: 1, size: 10, empleado_id: undefined })
 * // → HttpParams { page=1, size=10 }
 */
export function buildHttpParams(params: Record<string, ParamValue>): HttpParams {
  let httpParams = new HttpParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      httpParams = httpParams.set(key, String(value));
    }
  }
  return httpParams;
}
