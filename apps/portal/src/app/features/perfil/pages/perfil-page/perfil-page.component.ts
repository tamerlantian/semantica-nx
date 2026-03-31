import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { PageHeaderComponent } from '@semantica/ui';
import { ToastService, extractErrorMessage } from '@semantica/core';
import { PerfilService } from '../../services/perfil.service';
import { PerfilDetalle, UpdatePerfilRequest } from '../../models/perfil.model';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    AvatarModule,
    DividerModule,
    PageHeaderComponent,
  ],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
})
export class PerfilPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly perfilService = inject(PerfilService);
  private readonly toastService = inject(ToastService);

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private readonly detalle = signal<PerfilDetalle | null>(null);

  readonly userInitials = computed(() => {
    const d = this.detalle();
    if (!d) return '?';
    const first = d.nombres.charAt(0).toUpperCase();
    const last = d.apellidos.charAt(0).toUpperCase();
    return `${first}${last}` || '?';
  });

  readonly userFullName = computed(() => {
    const d = this.detalle();
    if (!d) return '';
    return `${d.nombres} ${d.apellidos}`.trim();
  });

  readonly userEmail = computed(() => this.detalle()?.email ?? '');

  readonly isIdentificacionLocked = computed(() => !!this.detalle()?.empleado_id);

  readonly form = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    numero_identificacion: ['', [Validators.required]],
    email: [{ value: '', disabled: true }],
  });

  get nombresControl() {
    return this.form.controls.nombres;
  }

  get apellidosControl() {
    return this.form.controls.apellidos;
  }

  get identificacionControl() {
    return this.form.controls.numero_identificacion;
  }

  ngOnInit(): void {
    this.loadDetalle();
  }

  private loadDetalle(): void {
    this.isLoading.set(true);
    this.perfilService.getDetalle().subscribe({
      next: (detalle) => {
        this.detalle.set(detalle);
        this.form.patchValue({
          nombres: detalle.nombres,
          apellidos: detalle.apellidos,
          numero_identificacion: detalle.numero_identificacion,
          email: detalle.email,
        });
        if (detalle.empleado_id) {
          this.form.controls.numero_identificacion.disable();
        }
        this.form.markAsPristine();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);

    const data: UpdatePerfilRequest = {
      nombres: this.form.getRawValue().nombres!,
      apellidos: this.form.getRawValue().apellidos!,
      numero_identificacion: this.form.getRawValue().numero_identificacion!,
    };

    this.perfilService.updatePerfil(data).subscribe({
      next: () => {
        this.perfilService.getDetalle().subscribe({
          next: (detalle) => {
            this.detalle.set(detalle);
            this.isSaving.set(false);
            this.toastService.success('Perfil actualizado correctamente');
            this.form.markAsPristine();
          },
          error: () => {
            this.isSaving.set(false);
            this.toastService.success('Perfil actualizado correctamente');
          },
        });
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Error al actualizar el perfil'));
      },
    });
  }
}
