import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-excluir-configuracao',
  standalone: true,
  imports: [],
  templateUrl: './modal-excluir-configuracao.component.html',
  styleUrl: './modal-excluir-configuracao.component.css'
})
export class ModalExcluirConfiguracaoComponent {
  @Input() titulo = 'Modal';

  constructor(public activeModal: NgbActiveModal) {
  }
}
