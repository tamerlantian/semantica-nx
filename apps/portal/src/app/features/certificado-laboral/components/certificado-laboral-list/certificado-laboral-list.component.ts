import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorAlertComponent,
} from '../../../../shared';
import { CertificadoLaboralService } from '../../services/certificado-laboral.service';
import { Contrato } from '../../models/contrato.model';
import { extractErrorMessage } from '@semantica/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-certificado-laboral-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
    TableModule,
    ButtonModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './certificado-laboral-list.component.html',
  styleUrl: './certificado-laboral-list.component.scss',
})
export class CertificadoLaboralListComponent implements OnInit {
  private readonly certificadoLaboralService = inject(CertificadoLaboralService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly contratos = signal<Contrato[]>([]);
  readonly totalRecords = signal(0);
  readonly pageSize = signal(50);
  readonly first = signal(0);

  ngOnInit(): void {
    this.loadContratos(1);
  }

  loadContratos(page: number): void {
    const user = this.authService.currentUser();

    if (!user) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.certificadoLaboralService
      .getContratos({ page, size: this.pageSize(), empleado_id: user.empleado_id! })
      .subscribe({
        next: (res) => {
          this.contratos.set(res.items);
          this.totalRecords.set(res.total);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(extractErrorMessage(err, 'No se pudieron cargar los contratos.'));
          this.loading.set(false);
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.first.set(first);
    this.pageSize.set(rows);
    this.loadContratos(Math.floor(first / rows) + 1);
  }
}
