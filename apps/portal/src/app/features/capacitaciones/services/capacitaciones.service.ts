import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { BaseHttpService, BaseQueryParams, PaginatedResponse } from '../../../core';
import { Capacitacion, CapacitacionDetalle } from '../models/capacitacion.model';

const MOCK_CAPACITACION_DETALLES: CapacitacionDetalle[] = [
  {
    id: 1,
    nombre: 'Seguridad y salud en el trabajo',
    descripcion: 'Capacitación sobre normativas SST y prevención de riesgos laborales.',
    tipo: 'Obligatoria',
    instructor: 'Carlos Mendoza',
    fecha_inicio: '2026-03-01',
    fecha_fin: '2026-03-15',
    duracion_horas: 40,
    estado: 'Completada',
    progreso: 100,
    modalidad: 'Presencial',
    lugar: 'Sala de conferencias A',
  },
  {
    id: 2,
    nombre: 'Liderazgo y trabajo en equipo',
    descripcion: 'Desarrollo de habilidades de liderazgo y gestión de equipos de trabajo.',
    tipo: 'Desarrollo',
    instructor: 'María Fernanda López',
    fecha_inicio: '2026-04-01',
    fecha_fin: '2026-04-30',
    duracion_horas: 24,
    estado: 'En progreso',
    progreso: 65,
    modalidad: 'Virtual',
    lugar: 'Plataforma Zoom',
  },
  {
    id: 3,
    nombre: 'Excel avanzado y análisis de datos',
    descripcion: 'Manejo avanzado de Excel con tablas dinámicas, macros y Power Query.',
    tipo: 'Técnica',
    instructor: 'Andrés Gutiérrez',
    fecha_inicio: '2026-05-10',
    fecha_fin: '2026-05-24',
    duracion_horas: 16,
    estado: 'Pendiente',
    progreso: 0,
    modalidad: 'Virtual',
    lugar: 'Microsoft Teams',
  },
  {
    id: 4,
    nombre: 'Primeros auxilios',
    descripcion: 'Técnicas básicas de primeros auxilios y atención de emergencias.',
    tipo: 'Obligatoria',
    instructor: 'Laura Martínez',
    fecha_inicio: '2026-02-10',
    fecha_fin: '2026-02-14',
    duracion_horas: 8,
    estado: 'Completada',
    progreso: 100,
    modalidad: 'Presencial',
    lugar: 'Centro de entrenamiento B',
  },
  {
    id: 5,
    nombre: 'Gestión del tiempo y productividad',
    descripcion: 'Técnicas para mejorar la productividad personal y gestión del tiempo.',
    tipo: 'Desarrollo',
    instructor: 'Ricardo Vargas',
    fecha_inicio: '2026-03-20',
    fecha_fin: '2026-03-25',
    duracion_horas: 12,
    estado: 'Cancelada',
    progreso: 30,
    modalidad: 'Presencial',
    lugar: 'Auditorio principal',
  },
  {
    id: 6,
    nombre: 'Manejo de conflictos laborales',
    descripcion: 'Estrategias para la resolución efectiva de conflictos en el entorno laboral.',
    tipo: 'Desarrollo',
    instructor: 'Patricia Rojas',
    fecha_inicio: '2026-04-15',
    fecha_fin: '2026-05-15',
    duracion_horas: 20,
    estado: 'En progreso',
    progreso: 40,
    modalidad: 'Virtual',
    lugar: 'Google Meet',
  },
];

@Injectable({ providedIn: 'root' })
export class CapacitacionesService extends BaseHttpService {
  getCapacitaciones(params?: BaseQueryParams): Observable<PaginatedResponse<Capacitacion>> {
    return this.get<PaginatedResponse<Capacitacion>>('/rhu/capacitacion/lista-portal', {
      page: params?.page,
      size: params?.size,
      empleado_id: params?.empleado_id,
    });
  }

  getCapacitacionDetalles(empleadoId: number): Observable<CapacitacionDetalle[]> {
    // TODO: reemplazar mock con endpoint real
    // return this.get<CapacitacionDetalle[]>('/rhu/capacitacion_detalle/lista-portal', {
    //   empleado_id: empleadoId,
    // });
    return of(MOCK_CAPACITACION_DETALLES).pipe(delay(800));
  }
}
