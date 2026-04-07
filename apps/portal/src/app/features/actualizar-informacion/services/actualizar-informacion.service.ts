import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core';
import {
  ActualizarInformacionRequest,
  Ciudad,
  EmpleadoDetalle,
} from '../models/empleado-detalle.model';

@Injectable({ providedIn: 'root' })
export class ActualizarInformacionService extends BaseHttpService {
  private readonly EMPLEADO_DETALLE_URL = '/rhu/empleado/detalle';
  private readonly ACTUALIZACION_URL = '/rhu/empleado_actualizacion/nuevo';
  // TODO: reemplazar con el endpoint real de ciudades
  private readonly CIUDADES_URL = '/gen/ciudad/lista';

  getEmpleadoDetalle(empleadoId: number): Observable<EmpleadoDetalle> {
    return this.get<EmpleadoDetalle>(this.EMPLEADO_DETALLE_URL, {
      empleado_id: empleadoId,
    });
  }

  solicitarActualizacion(body: ActualizarInformacionRequest): Observable<unknown> {
    return this.post<unknown>(this.ACTUALIZACION_URL, body);
  }

  getCiudades(nombre?: string): Observable<Ciudad[]> {
    return this.get<Ciudad[]>(this.CIUDADES_URL, {
      nombre: nombre ?? '',
    });
  }
}
