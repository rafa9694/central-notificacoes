import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Component for config deletion warning
@Component({
  selector: 'app-modal-delete-config',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete-config.component.html',
  styleUrl: './modal-delete-config.component.css'
})
export class ModalDeleteConfigComponent {
  @Input() title = 'Modal';

  constructor(public activeModal: NgbActiveModal) {
  }
}
