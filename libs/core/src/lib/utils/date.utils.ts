/** Nombres de los meses en español, indexados desde 0 (enero = índice 0). */
export const MESES_ES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

/**
 * Retorna el label "mes año" en español para un mes y año dados.
 * Ejemplo: getMesAnioLabel(3, 2026) → "marzo 2026"
 */
export function getMesAnioLabel(mes: number, anio: number): string {
  return `${MESES_ES[mes - 1]} ${anio}`;
}

/**
 * Calcula el mes siguiente con rollover de año (diciembre → enero del año siguiente).
 * Ejemplo: getSiguienteMes(12, 2025) → { mes: 1, anio: 2026 }
 */
export function getSiguienteMes(mes: number, anio: number): { mes: number; anio: number } {
  return mes === 12 ? { mes: 1, anio: anio + 1 } : { mes: mes + 1, anio };
}
