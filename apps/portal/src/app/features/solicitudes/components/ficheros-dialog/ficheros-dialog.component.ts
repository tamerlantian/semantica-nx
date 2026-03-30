import { Component, inject, input, model, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { SolicitudesService } from '../../services/solicitudes.service';
import { extractErrorMessage, ToastService } from '@semantica/core';

@Component({
  selector: 'app-ficheros-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, FileUploadModule, ProgressBarModule],
  templateUrl: './ficheros-dialog.component.html',
  styleUrl: './ficheros-dialog.component.scss',
})
export class FicherosDialogComponent {
  private readonly solicitudesService = inject(SolicitudesService);
  private readonly toastService = inject(ToastService);

  readonly visible = model(false);
  readonly solicitudId = input.required<number>();

  readonly uploading = signal(false);
  readonly selectedFile = signal<File | null>(null);

  onSelect(event: { files: File[] }): void {
    this.selectedFile.set(event.files[0] ?? null);
  }

  onClear(): void {
    this.selectedFile.set(null);
  }

  submitUpload(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);

    this.solicitudesService.cargarFichero(this.solicitudId(), file).subscribe({
      next: () => {
        this.toastService.success('Archivo cargado', 'El archivo se subió correctamente.');
        this.uploading.set(false);
        this.selectedFile.set(null);
        this.visible.set(false);
      },
      error: (err) => {
        this.toastService.error(extractErrorMessage(err, 'No se pudo cargar el archivo.'));
        this.uploading.set(false);
      },
    });
  }

  onHide(): void {
    this.selectedFile.set(null);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  getFileIcon(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'pi pi-image';
    if (['pdf'].includes(ext)) return 'pi pi-file-pdf';
    if (['doc', 'docx'].includes(ext)) return 'pi pi-file-word';
    if (['xls', 'xlsx'].includes(ext)) return 'pi pi-file-excel';
    return 'pi pi-file';
  }
}
