import { Component, input } from '@angular/core';
import { Turno } from '../../models/turno.model';

@Component({
  selector: 'app-turnos-legend',
  standalone: true,
  templateUrl: './turnos-legend.component.html',
  styleUrl: './turnos-legend.component.scss',
})
export class TurnosLegendComponent {
  readonly turnos = input<Turno[]>([]);
}
