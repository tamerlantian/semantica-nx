import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { CreditosService } from '../../services/creditos.service';
import { Credito } from '../../models/credito.model';
import { extractErrorMessage } from '@semantica/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-creditos-list',
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
  templateUrl: './creditos-list.component.html',
  styleUrl: './creditos-list.component.scss',
})
export class CreditosListComponent implements OnInit {
  private readonly creditosService = inject(CreditosService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly creditos = signal<Credito[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);

  ngOnInit(): void {
    this.loadCreditos(1);
  }

  loadCreditos(page: number): void {
    const user = this.authService.currentUser();

    if (!user?.empleado_id) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.creditosService
      .getCreditos({ page, size: this.pageSize(), empleado_id: user.empleado_id })
      .subscribe({
        next: (res) => {
          this.creditos.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar los créditos.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadCreditos(Math.floor(first / rows) + 1);
  }
}
