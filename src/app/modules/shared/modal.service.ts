import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  closeModal = new EventEmitter();

  constructor() { }

  onCloseModal() {
    this.closeModal.emit();
  }
}
