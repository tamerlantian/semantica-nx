import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import { ProgramacionEmpleado, Turno } from '../models/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnosService extends BaseHttpService {
  private readonly TURNOS_URL = '/tur/programacion/empleado';
  private readonly TURNO_PROGRAMACION_URL = '/tur/turno/programacion';

  /** Consulta la programación mensual de turnos para un empleado en un año y mes específicos. */
  getProgramacionEmpleado(
    empleadoId: number,
    anio: number,
    mes: number,
  ): Observable<ProgramacionEmpleado[]> {
    return this.get<ProgramacionEmpleado[]>(this.TURNOS_URL, {
      empleado_id: empleadoId,
      anio,
      mes,
    });
  }

  /** Obtiene el detalle de los turnos a partir de sus códigos. */
  getTurnosProgramacion(turnos: string[]): Observable<PaginatedResponse<Turno>> {
    return this.post<PaginatedResponse<Turno>>(this.TURNO_PROGRAMACION_URL, { turnos });
  }
}
