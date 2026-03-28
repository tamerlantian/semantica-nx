import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AccordionModule } from 'primeng/accordion';
import { AuthService } from '../../auth/services/auth.service';
import { ToastService, extractErrorMessage } from '@semantica/core';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  requiresTenant?: boolean;
}

interface NavGroup {
  label: string;
  icon: string;
  children: NavItem[];
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    DrawerModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    AccordionModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);

  readonly currentUser = this.authService.currentUser;
  readonly hasTenant = this.authService.hasTenant;
  readonly drawerVisible = signal(false);
  readonly dialogVisible = signal(false);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    tenantId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  readonly inicioItem: NavItem = {
    label: 'Inicio',
    icon: 'pi pi-home',
    route: ROUTE_PATHS.dashboard.inicio,
  };

  readonly activeGroups: string[] = ['Consultas', 'Finanzas'];

  readonly navGroups: NavGroup[] = [
    {
      label: 'Consultas',
      icon: 'pi pi-search',
      children: [
        {
          label: 'Pagos',
          icon: 'pi pi-credit-card',
          route: ROUTE_PATHS.dashboard.pagos,
          requiresTenant: true,
        },
        {
          label: 'Turnos',
          icon: 'pi pi-calendar',
          route: ROUTE_PATHS.dashboard.turnos,
          requiresTenant: true,
        },
        {
          label: 'Reclamos',
          icon: 'pi pi-exclamation-triangle',
          route: ROUTE_PATHS.dashboard.reclamos,
          requiresTenant: true,
        },
        {
          label: 'Solicitudes',
          icon: 'pi pi-file',
          route: ROUTE_PATHS.dashboard.solicitudes,
          requiresTenant: true,
        },
        {
          label: 'Capacitaciones',
          icon: 'pi pi-book',
          route: ROUTE_PATHS.dashboard.capacitaciones,
          requiresTenant: true,
        },
        {
          label: 'Certificado laboral',
          icon: 'pi pi-id-card',
          route: ROUTE_PATHS.dashboard.certificadoLaboral,
          requiresTenant: true,
        },
      ],
    },
    {
      label: 'Finanzas',
      icon: 'pi pi-wallet',
      children: [
        {
          label: 'Créditos',
          icon: 'pi pi-money-bill',
          route: ROUTE_PATHS.dashboard.creditos,
          requiresTenant: true,
        },
        {
          label: 'Anticipo de nómina',
          icon: 'pi pi-dollar',
          route: ROUTE_PATHS.dashboard.anticipoNomina,
          requiresTenant: true,
        },
      ],
    },
  ];

  toggleDrawer(): void {
    this.drawerVisible.update((v) => !v);
  }

  openDialog(): void {
    this.errorMessage.set(null);
    this.form.reset();
    this.dialogVisible.set(true);
  }

  onAsociar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const tenantId = Number(this.form.getRawValue().tenantId);

    this.authService.asociarEmpresa(tenantId).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogVisible.set(false);
        this.toast.success('Empresa asociada correctamente.');
      },
      error: (err) => {
        this.errorMessage.set(
          extractErrorMessage(
            err,
            'No se pudo asociar la empresa. Verifica el código e intenta de nuevo.',
          ),
        );
        this.isLoading.set(false);
      },
    });
  }

  get tenantIdControl() {
    return this.form.controls.tenantId;
  }

  logout(): void {
    this.authService.logout();
  }
}
