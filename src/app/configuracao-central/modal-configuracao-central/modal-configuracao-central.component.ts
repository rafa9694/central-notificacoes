import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { ConfiguracaoCentralService } from '../configuracao-central.service';

@Component({
  selector: 'app-modal-configuracao-central',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-configuracao-central.component.html',
  styleUrl: './modal-configuracao-central.component.css'
})
export class ModalConfiguracaoCentralComponent implements OnInit {
  @Input() titulo = 'Modal';
  configForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private configuracaoCentralService: ConfiguracaoCentralService) { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
    });
  }

  salvarMudanca() {
    let config: ConfiguracaoTable = {
      nome: this.configForm.get('nome')?.value,
      tipo: this.configForm.get('tipo')?.value
    };

    this.configuracaoCentralService.addConfig(config);
    this.activeModal.dismiss()
  }
}
