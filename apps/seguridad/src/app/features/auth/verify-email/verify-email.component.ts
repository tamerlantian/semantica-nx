import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTE_PATHS, extractErrorMessage } from '../../../core';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Estado inicial en `false`: la verificación NO se dispara al cargar la página,
   * sino al hacer clic en el botón. Esto evita que webviews de apps de correo o
   * escáneres de seguridad que solo "abren" el enlace consuman el token de un solo
   * uso antes de que el usuario lo confirme (causa de "Token inválido" en móvil).
   */
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly verified = signal(false);

  private readonly token = signal<string | null>(null);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.router.navigate([ROUTE_PATHS.auth.login]);
      return;
    }

    // Solo guardamos el token; la verificación ocurre al confirmar con el botón.
    this.token.set(token);
  }

  /** Confirma el correo. Se invoca con un clic explícito del usuario. */
  verificar(): void {
    const token = this.token();
    if (!token || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.verified.set(true);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(
          extractErrorMessage(
            err,
            'No se pudo verificar la cuenta. El enlace puede haber expirado o ser inválido.',
          ),
        );
        this.isLoading.set(false);
      },
    });
  }
}
