import { Component, computed, inject, input, model, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { extractErrorMessage, FicherosService, ToastService } from '@semantica/core';
import type { Fichero } from '@semantica/core';

@Component({
  selector: 'app-ficheros-dialog',
  standalone: true,
  imports: [DatePipe, DialogModule, ButtonModule, FileUploadModule, ProgressBarModule],
  templateUrl: './ficheros-dialog.component.html',
  styleUrl: './ficheros-dialog.component.scss',
})
export class FicherosDialogComponent {
  private readonly ficherosService = inject(FicherosService);
  private readonly toastService = inject(ToastService);

  readonly visible = model(false);
  readonly recordId = input.required<number | string>();
  readonly codigoModelo = input.required<string>();
  readonly header = input<string>();

  protected readonly dialogHeader = computed(
    () => this.header() ?? `Archivos - Registro #${this.recordId()}`,
  );

  readonly uploading = signal(false);
  readonly selectedFile = signal<File | null>(null);
  readonly ficheros = signal<Fichero[]>([]);
  readonly loadingFicheros = signal(false);
  readonly errorFicheros = signal<string | null>(null);

  onShow(): void {
    this.loadFicheros();
  }

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

    this.ficherosService
      .cargarFichero(this.codigoModelo(), this.recordId(), file)
      .subscribe({
        next: () => {
          this.toastService.success('Archivo cargado', 'El archivo se subió correctamente.');
          this.uploading.set(false);
          this.selectedFile.set(null);
          this.loadFicheros();
        },
        error: (err) => {
          this.toastService.error(extractErrorMessage(err, 'No se pudo cargar el archivo.'));
          this.uploading.set(false);
        },
      });
  }

  onHide(): void {
    this.selectedFile.set(null);
    this.ficheros.set([]);
    this.errorFicheros.set(null);
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
    return this.getExtensionIcon(ext);
  }

  getExtensionIcon(extension: string): string {
    const ext = extension.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'pi pi-image';
    if (['pdf'].includes(ext)) return 'pi pi-file-pdf';
    if (['doc', 'docx'].includes(ext)) return 'pi pi-file-word';
    if (['xls', 'xlsx'].includes(ext)) return 'pi pi-file-excel';
    return 'pi pi-file';
  }

  private loadFicheros(): void {
    this.loadingFicheros.set(true);
    this.errorFicheros.set(null);

    this.ficherosService
      .getFicheros(this.codigoModelo(), String(this.recordId()))
      .subscribe({
        next: (ficheros) => {
          this.ficheros.set(ficheros);
          this.loadingFicheros.set(false);
        },
        error: (err) => {
          this.errorFicheros.set(
            extractErrorMessage(err, 'No se pudieron cargar los archivos.'),
          );
          this.loadingFicheros.set(false);
        },
      });
  }
}
