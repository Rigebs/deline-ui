import { Component, signal, output, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dln-file-upload',
  host: {
    '[class.is-dragging]': 'isDragging()',
    '[class.has-file]': 'fileName()',
  },
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  private fileInputRef = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  private get fileInput(): HTMLInputElement {
    return this.fileInputRef().nativeElement;
  }

  isDragging = signal(false);
  fileName = signal<string | null>(null);
  previewUrl = signal<string | null>(null);
  fileSelected = output<File>();

  protected onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onDragLeave() {
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) this.handleFile(files[0]);
  }

  protected onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.handleFile(input.files[0]);
  }

  private handleFile(file: File) {
    this.fileName.set(file.name);
    this.fileSelected.emit(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  protected triggerSelect() {
    this.fileInput.click();
  }

  protected removeFile(event: Event) {
    event.stopPropagation();
    this.fileName.set(null);
    this.previewUrl.set(null);
    this.fileInput.value = '';
  }
}
