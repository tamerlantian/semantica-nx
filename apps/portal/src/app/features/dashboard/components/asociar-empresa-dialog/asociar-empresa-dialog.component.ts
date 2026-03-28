import { Component, inject, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../auth/services/auth.service';
import { Tenant } from '../../models/tenant.model';
import { ToastService, extractErrorMessage } from '@semantica/core';

@Component({
  selector: 'app-asociar-empresa-dialog',
  standalone: true,
  imports: [FormsModule, DialogModule, AutoCompleteModule, ButtonModule, MessageModule],
  templateUrl: './asociar-empresa-dialog.component.html',
  styleUrl: './asociar-empresa-dialog.component.scss',
})
export class AsociarEmpresaDialogComponent {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  readonly visible = model(false);
  readonly asociada = output<void>();

  readonly suggestions = signal<Tenant[]>([]);
  readonly searching = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  selectedTenant: Tenant | null = null;

  onSearch(event: AutoCompleteCompleteEvent): void {
    const query = event.query.trim();

    if (query.length < 2) {
      this.suggestions.set([]);
      return;
    }

    this.searching.set(true);
    this.authService.buscarTenants(query).subscribe({
      next: (res) => {
        this.suggestions.set(res.items);
        this.searching.set(false);
      },
      error: () => {
        this.suggestions.set([]);
        this.searching.set(false);
      },
    });
  }

  onShow(): void {
    this.selectedTenant = null;
    this.errorMessage.set(null);
    this.suggestions.set([]);
  }

  onSubmit(): void {
    if (!this.selectedTenant) {
      this.errorMessage.set('Debes seleccionar una empresa.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.authService.asociarEmpresa(this.selectedTenant.id).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toastService.success('Empresa asociada correctamente.');
        this.asociada.emit();
        this.visible.set(false);
      },
      error: (err) => {
        this.errorMessage.set(
          extractErrorMessage(
            err,
            'No se pudo asociar la empresa. Verifica la selección e intenta de nuevo.',
          ),
        );
        this.submitting.set(false);
      },
    });
  }
}
