import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProgramacionesService } from '../../services/programaciones.service';
import { ProgramacionEmpleado, Turno } from '../../models/programacion.model';
import { extraerTurnosUnicos } from '../../helpers/programacion.helper';
import { PageHeaderComponent, LoadingSpinnerComponent } from '@semantica/ui';
import { ProgramacionTableComponent } from '../../components/programacion-table/programacion-table.component';
import { ProgramacionesLegendComponent } from '../../components/programaciones-legend/programaciones-legend.component';

@Component({
  selector: 'app-programaciones-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    ProgramacionTableComponent,
    ProgramacionesLegendComponent,
  ],
  templateUrl: './programaciones-list.component.html',
  styleUrl: './programaciones-list.component.scss',
})
export class ProgramacionesListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly programacionesService = inject(ProgramacionesService);

  readonly programaciones = signal<ProgramacionEmpleado[]>([]);
  readonly turnos = signal<Turno[]>([]);
  readonly loading = signal(true);

  readonly diaActual = new Date().getDate();
  readonly diasDelMes = computed(() => {
    const hoy = new Date();
    const totalDias = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    return Array.from({ length: totalDias }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user?.empleado_id) {
      this.loading.set(false);
      return;
    }

    const hoy = new Date();
    this.programacionesService
      .getProgramacionEmpleado(user.empleado_id, hoy.getFullYear(), hoy.getMonth() + 1)
      .subscribe({
        next: (programaciones) => {
          this.programaciones.set(programaciones);
          this.loading.set(false);
          this.cargarTurnosProgramacion(programaciones);
        },
        error: () => this.loading.set(false),
      });
  }

  private cargarTurnosProgramacion(programaciones: ProgramacionEmpleado[]): void {
    const turnosUnicos = extraerTurnosUnicos(programaciones);
    if (turnosUnicos.length === 0) return;

    this.programacionesService.getTurnosProgramacion(turnosUnicos).subscribe({
      next: (response) => this.turnos.set(response.items),
    });
  }
}
