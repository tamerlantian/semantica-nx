import { Component, computed, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgramacionEmpleado } from '../../models/programacion.model';
import { ReporteCreateDialogComponent } from '../reporte-create-dialog/reporte-create-dialog.component';

@Component({
  selector: 'app-programacion-table',
  standalone: true,
  imports: [TableModule, ButtonModule, ReporteCreateDialogComponent],
  templateUrl: './programacion-table.component.html',
  styleUrl: './programacion-table.component.scss',
})
export class ProgramacionTableComponent {
  readonly programaciones = input.required<ProgramacionEmpleado[]>();
  readonly diasDelMes = input.required<number[]>();
  readonly diaActual = input.required<number>();

  readonly totalColumnas = computed(() => this.diasDelMes().length);

  readonly reporteDialogVisible = signal(false);
  readonly programacionSeleccionada = signal(0);

  abrirReporte(prog: ProgramacionEmpleado): void {
    this.programacionSeleccionada.set(prog.codigo_programacion_pk);
    this.reporteDialogVisible.set(true);
  }

  onReporteCreado(): void {
    // El diálogo ya muestra el toast de éxito
  }
}
