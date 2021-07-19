import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  // @Output() closeModal = new EventEmitter();
  @Input() backgroundStyle = 'default';
  @Input() showCloseBtn = true;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.modalService.onCloseModal();
  }
}
