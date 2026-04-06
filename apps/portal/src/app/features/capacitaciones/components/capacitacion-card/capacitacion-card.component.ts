import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { ProgressBar } from 'primeng/progressbar';
import { CapacitacionDetalle } from '../../models/capacitacion.model';

@Component({
  selector: 'app-capacitacion-card',
  standalone: true,
  imports: [DatePipe, Tag, ProgressBar],
  templateUrl: './capacitacion-card.component.html',
  styleUrl: './capacitacion-card.component.scss',
})
export class CapacitacionCardComponent {
  readonly capacitacion = input.required<CapacitacionDetalle>();

  readonly estadoSeverity = computed(() => {
    const estado = this.capacitacion().estado;
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      Completada: 'success',
      'En progreso': 'info',
      Pendiente: 'warn',
      Cancelada: 'danger',
    };
    return map[estado] ?? 'secondary';
  });

  readonly modalidadIcon = computed(() =>
    this.capacitacion().modalidad === 'Virtual' ? 'pi pi-video' : 'pi pi-map-marker',
  );

  readonly showProgress = computed(() => {
    const cap = this.capacitacion();
    return cap.progreso > 0 && cap.estado !== 'Completada';
  });
}
