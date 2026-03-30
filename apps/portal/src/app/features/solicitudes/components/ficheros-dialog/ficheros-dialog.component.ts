import { Component, inject, input, model, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Fichero } from '../../models/fichero.model';
import { extractErrorMessage, ToastService } from '@semantica/core';

@Component({
  selector: 'app-ficheros-dialog',
  standalone: true,
  imports: [DatePipe, DialogModule, ButtonModule, FileUploadModule, ProgressBarModule],
  templateUrl: './ficheros-dialog.component.html',
  styleUrl: './ficheros-dialog.component.scss',
})
export class FicherosDialogComponent {
  private readonly solicitudesService = inject(SolicitudesService);
  private readonly toastService = inject(ToastService);

  readonly visible = model(false);
  readonly solicitudId = input.required<number>();

  readonly ficheros = signal<Fichero[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly uploading = signal(false);

  onShow(): void {
    this.loadFicheros();
  }

  onHide(): void {
    this.ficheros.set([]);
    this.error.set(null);
  }

  onUpload(event: FileUploadHandlerEvent): void {
    const file = event.files[0];
    if (!file) return;

    this.uploading.set(true);

    this.solicitudesService.cargarFichero(this.solicitudId(), file).subscribe({
      next: () => {
        this.toastService.success('Archivo cargado', 'El archivo se subió correctamente.');
        this.uploading.set(false);
        this.loadFicheros();
      },
      error: (err) => {
        this.toastService.error(extractErrorMessage(err, 'No se pudo cargar el archivo.'));
        this.uploading.set(false);
      },
    });
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
