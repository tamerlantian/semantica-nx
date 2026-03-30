import { Component, inject, model, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Fichero } from '../../models/fichero.model';
import { extractErrorMessage } from '@semantica/core';

@Component({
  selector: 'app-ficheros-list-dialog',
  standalone: true,
  imports: [DatePipe, DialogModule, ButtonModule],
  templateUrl: './ficheros-list-dialog.component.html',
  styleUrl: './ficheros-list-dialog.component.scss',
})
export class FicherosListDialogComponent {
  private readonly solicitudesService = inject(SolicitudesService);

  readonly visible = model(false);

  readonly ficheros = signal<Fichero[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  onShow(): void {
    this.loadFicheros();
  }

  onHide(): void {
    this.ficheros.set([]);
    this.error.set(null);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private loadFicheros(): void {
    this.loading.set(true);
    this.error.set(null);

    this.solicitudesService.getFicheros().subscribe({
      next: (res) => {
        this.ficheros.set(res.items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(extractErrorMessage(err, 'No se pudieron cargar los archivos.'));
        this.loading.set(false);
      },
    });
  }
}
