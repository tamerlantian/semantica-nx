import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService, PaginatedResponse } from '../../../core';
import {
  CreateProgramacionReporteRequest,
  ProgramacionEmpleado,
  ProgramacionReporte,
  ProgramacionReporteRespuesta,
  ProgramacionReporteTipo,
  Turno,
} from '../models/turno.model';

@Injectable({ providedIn: 'root' })
export class TurnosService extends BaseHttpService {
  private readonly TURNOS_URL = '/tur/programacion/empleado';
  private readonly REPORTE_TIPOS_URL = '/tur/programacion_reporte_tipo/lista';
  private readonly REPORTE_CREATE_URL = '/tur/programacion_reporte/nuevo';
  private readonly REPORTE_RESPUESTAS_URL = '/tur/programacion_reporte_respuesta/lista';
  private readonly REPORTE_LISTA_URL = '/tur/programacion_reporte/lista';
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

  /** Obtiene la lista de tipos de reporte de programación. */
  getReporteTipos(): Observable<PaginatedResponse<ProgramacionReporteTipo>> {
    return this.get<PaginatedResponse<ProgramacionReporteTipo>>(this.REPORTE_TIPOS_URL, {
      size: 200,
    });
  }

  /** Crea un nuevo reporte de programación. */
  createReporte(body: CreateProgramacionReporteRequest): Observable<ProgramacionReporte> {
    return this.post<ProgramacionReporte>(this.REPORTE_CREATE_URL, body);
  }

  /** Obtiene la lista paginada de reportes de un empleado. */
  getReportes(
    empleadoId: number,
    page = 1,
    size = 50,
  ): Observable<PaginatedResponse<ProgramacionReporte>> {
    return this.get<PaginatedResponse<ProgramacionReporte>>(this.REPORTE_LISTA_URL, {
      empleado_id: empleadoId,
      page,
      size,
    });
  }

  /** Obtiene el detalle de los turnos a partir de sus códigos. */
  getTurnosProgramacion(turnos: string[]): Observable<PaginatedResponse<Turno>> {
    return this.post<PaginatedResponse<Turno>>(this.TURNO_PROGRAMACION_URL, { turnos });
  }

  /** Obtiene las respuestas de un reporte de programación. */
  getRespuestasReporte(
    programacionId: number,
  ): Observable<PaginatedResponse<ProgramacionReporteRespuesta>> {
    return this.get<PaginatedResponse<ProgramacionReporteRespuesta>>(this.REPORTE_RESPUESTAS_URL, {
      programacion_reporte_id: programacionId,
      size: 50,
      page: 1,
    });
  }
}
