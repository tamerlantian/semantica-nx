import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
} from '../../../../shared';
import { UsuarioService } from '../../services/usuario.service';
import { TenantService } from '../../services/tenant.service';
import { UsuarioListItem, USER_ROLES } from '../../models/usuario.model';
import { Tenant } from '../../models/tenant.model';
import { extractErrorMessage } from '../../../../core';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    SelectModule,
    AutoCompleteModule,
  ],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss',
})
export class UsuarioListComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly tenantService = inject(TenantService);
  private readonly messageService = inject(MessageService);

  readonly usuarios = this.usuarioService.usuarios;
  readonly totalRecords = this.usuarioService.total;
  readonly loading = signal(true);
  readonly rows = signal(10);

  readonly roleOptions = USER_ROLES;
  private readonly roleLabels = new Map(USER_ROLES.map((r) => [r.value, r.label]));

  // ── Diálogo de creación ──
  readonly createDialogVisible = signal(false);
  readonly submitting = signal(false);
  readonly tenantSuggestions = signal<Tenant[]>([]);
  readonly searchingTenants = signal(false);

  readonly createForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', Validators.required],
    tenant: [null as Tenant | null, Validators.required],
  });

  ngOnInit(): void {
    this.loadUsuarios(1, this.rows());
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows();
    const page = Math.floor(first / rows) + 1;
    this.loadUsuarios(page, rows);
  }

  loadUsuarios(page: number, size: number): void {
    this.loading.set(true);
    this.usuarioService.getUsuarios(page, size).subscribe({
      next: () => this.loading.set(false),
      error: (err: unknown) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: extractErrorMessage(err, 'No se pudieron cargar los usuarios.'),
        });
      },
    });
  }

  openCreateDialog(): void {
    this.createForm.reset({ email: '', password: '', role: '', tenant: null });
    this.tenantSuggestions.set([]);
    this.createDialogVisible.set(true);
  }

  onSearchTenants(event: AutoCompleteCompleteEvent): void {
    const query = event.query.trim();
    if (query.length < 2) {
      this.tenantSuggestions.set([]);
      return;
    }

    this.searchingTenants.set(true);
    this.tenantService.buscarTenants(query).subscribe({
      next: (tenants) => {
        this.tenantSuggestions.set(tenants);
        this.searchingTenants.set(false);
      },
      error: () => {
        this.tenantSuggestions.set([]);
        this.searchingTenants.set(false);
      },
    });
  }

  submitCreate(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const { email, password, role, tenant } = this.createForm.getRawValue();
    if (tenant == null) return;

    this.submitting.set(true);
    this.usuarioService.createUsuario({ email, password, role, tenant_id: tenant.id }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.createDialogVisible.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario creado',
          detail: `Se creó el usuario ${email}.`,
        });
        this.loadUsuarios(1, this.rows());
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: extractErrorMessage(err, 'No se pudo crear el usuario.'),
        });
      },
    });
  }

  /** Nombre completo del usuario; cae al email si no tiene nombre cargado. */
  displayName(u: UsuarioListItem): string {
    const full = `${u.nombres ?? ''} ${u.apellidos ?? ''}`.trim();
    return full || u.email;
  }

  /** Indica si el usuario tiene nombre cargado (para mostrar el email como secundario). */
  hasName(u: UsuarioListItem): boolean {
    return Boolean(u.nombres?.trim() || u.apellidos?.trim());
  }

  /** Inicial para el avatar de la fila. */
  initial(u: UsuarioListItem): string {
    return this.displayName(u).charAt(0).toUpperCase() || '?';
  }

  /** Etiqueta legible del rol en español. */
  roleLabel(role: string): string {
    return this.roleLabels.get(role) ?? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}
