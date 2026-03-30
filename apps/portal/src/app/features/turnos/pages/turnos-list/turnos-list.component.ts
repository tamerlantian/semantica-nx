import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { TurnosService } from '../../services/turnos.service';
import { ProgramacionEmpleado, Turno, TurnoDelDia } from '../../models/turno.model';
import { extraerTurnosUnicos, obtenerTurnosHoyManana } from '../../helpers/turno.helper';
import { PageHeaderComponent, LoadingSpinnerComponent } from '@semantica/ui';
import { TurnoCardComponent } from '../../components/turno-card/turno-card.component';

@Component({
  selector: 'app-turnos-list',
  standalone: true,
  imports: [PageHeaderComponent, LoadingSpinnerComponent, TurnoCardComponent],
  templateUrl: './turnos-list.component.html',
  styleUrl: './turnos-list.component.scss',
})
export class TurnosListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly turnosService = inject(TurnosService);

  readonly turnoHoy = signal<TurnoDelDia | null>(null);
  readonly turnoManana = signal<TurnoDelDia | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.loading.set(false);
      return;
    }

    obtenerTurnosHoyManana(this.turnosService, user.empleado_id!).subscribe({
      next: ({ turnoHoy, turnoManana, programaciones }) => {
        this.loading.set(false);
        this.cargarTurnosProgramacion(programaciones, turnoHoy, turnoManana);
      },
      error: () => this.loading.set(false),
    });
  }

  private cargarTurnosProgramacion(
    programaciones: ProgramacionEmpleado[],
    turnoHoy: TurnoDelDia | null,
    turnoManana: TurnoDelDia | null,
  ): void {
    const turnosUnicos = extraerTurnosUnicos(programaciones);
    if (turnosUnicos.length === 0) {
      this.turnoHoy.set(turnoHoy);
      this.turnoManana.set(turnoManana);
      return;
    }

    this.turnosService.getTurnosProgramacion(turnosUnicos).subscribe({
      next: (response) => {
        const turnosMap = new Map(response.items.map((t) => [t.codigo_turno_pk, t]));
        this.turnoHoy.set(this.enriquecerTurno(turnoHoy, turnosMap));
        this.turnoManana.set(this.enriquecerTurno(turnoManana, turnosMap));
      },
      error: () => {
        this.turnoHoy.set(turnoHoy);
        this.turnoManana.set(turnoManana);
      },
    });
  }

  private enriquecerTurno(
    turno: TurnoDelDia | null,
    turnosMap: Map<string, Turno>,
  ): TurnoDelDia | null {
    if (!turno) return null;
    const detalle = turnosMap.get(turno.turno);
    if (!detalle) return turno;
    return { ...turno, nombre_turno: detalle.nombre };
  }
}
