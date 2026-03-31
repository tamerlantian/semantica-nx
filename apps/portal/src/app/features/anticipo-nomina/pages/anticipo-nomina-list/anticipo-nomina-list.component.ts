import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { AnticipoNominaService } from '../../services/anticipo-nomina.service';
import { AnticipoNomina } from '../../models/anticipo-nomina.model';
import { extractErrorMessage } from '@semantica/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-anticipo-nomina-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './anticipo-nomina-list.component.html',
  styleUrl: './anticipo-nomina-list.component.scss',
})
export class AnticipoNominaListComponent implements OnInit {
  private readonly anticipoNominaService = inject(AnticipoNominaService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly anticipos = signal<AnticipoNomina[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);

  ngOnInit(): void {
    this.loadAnticipos(1);
  }

  loadAnticipos(page: number): void {
    const user = this.authService.currentUser();

    if (!user?.empleado_id) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.anticipoNominaService
      .getAnticipos({ page, size: this.pageSize(), empleado_id: user.empleado_id })
      .subscribe({
        next: (res) => {
          this.anticipos.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar los anticipos de nómina.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadAnticipos(Math.floor(first / rows) + 1);
  }
}
