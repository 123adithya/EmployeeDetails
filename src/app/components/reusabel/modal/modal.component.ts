import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('modal') modalElement!: ElementRef;

  private modalInstance: any;

  open(): void {
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
    this.modalInstance.show();
  }

  close(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  onOk(): void {
    this.ok.emit();
    this.close();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
  }
}
