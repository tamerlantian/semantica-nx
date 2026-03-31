import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PageHeaderComponent } from '@semantica/ui';
import { ToastService } from '@semantica/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PerfilService } from '../../services/perfil.service';
import { UpdatePerfilRequest } from '../../models/perfil.model';
import { extractErrorMessage } from '@semantica/core';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, MessageModule, PageHeaderComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
})
export class PerfilPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly perfilService = inject(PerfilService);
  private readonly toastService = inject(ToastService);

  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);

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
    const user = this.authService.currentUser();
    if (user) {
      this.form.patchValue({
        nombres: user.name ?? '',
        apellidos: user.apellidos ?? '',
        numero_identificacion: user.numero_identificacion ?? '',
        email: user.email,
      });
    }
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
        this.authService.me().subscribe({
          next: () => {
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
