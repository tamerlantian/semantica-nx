import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { CapacitacionesService } from '../../services/capacitaciones.service';
import { Capacitacion } from '../../models/capacitacion.model';
import { extractErrorMessage } from '@semantica/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-capacitaciones-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    DatePipe,
  ],
  templateUrl: './capacitaciones-list.component.html',
  styleUrl: './capacitaciones-list.component.scss',
})
export class CapacitacionesListComponent implements OnInit {
  private readonly capacitacionesService = inject(CapacitacionesService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly capacitaciones = signal<Capacitacion[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);

  ngOnInit(): void {
    this.loadCapacitaciones(1);
  }

  loadCapacitaciones(page: number): void {
    const user = this.authService.currentUser();

    if (!user?.empleado_id) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.capacitacionesService
      .getCapacitaciones({ page, size: this.pageSize(), empleado_id: user.empleado_id })
      .subscribe({
        next: (res) => {
          this.capacitaciones.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar las capacitaciones.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadCapacitaciones(Math.floor(first / rows) + 1);
  }
}
