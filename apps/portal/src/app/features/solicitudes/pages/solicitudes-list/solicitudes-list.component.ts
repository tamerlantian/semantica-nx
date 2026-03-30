import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolicitudEmpleado } from '../../models/solicitud.model';
import { extractErrorMessage } from '@semantica/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    DatePipe,
  ],
  templateUrl: './solicitudes-list.component.html',
  styleUrl: './solicitudes-list.component.scss',
})
export class SolicitudesListComponent implements OnInit {
  private readonly solicitudesService = inject(SolicitudesService);
  private readonly authService = inject(AuthService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly solicitudes = signal<SolicitudEmpleado[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);

  ngOnInit(): void {
    this.loadSolicitudes(1);
  }

  loadSolicitudes(page: number): void {
    const user = this.authService.currentUser();

    if (!user) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.solicitudesService
      .getSolicitudes({ page, size: this.pageSize(), empleado_id: user.empleado_id! })
      .subscribe({
        next: (res) => {
          this.solicitudes.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar las solicitudes.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadSolicitudes(Math.floor(first / rows) + 1);
  }
}
