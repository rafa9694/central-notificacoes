import { Component, Input } from '@angular/core';
import { ConfiguracaoService } from '../configuracao.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfiguracaoTable } from '../model/configuracao-table.model';

@Component({
  selector: 'app-modal-configuracao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-configuracao.component.html',
  styleUrl: './modal-configuracao.component.css'
})
export class ModalConfiguracaoComponent {
  configForm!: FormGroup;

  @Input() configEntrada!: ConfiguracaoTable;
  @Input() editarIndex!: number;
  @Input() titulo = 'Modal';

  constructor(
    public activeModal: NgbActiveModal,
    private configuracaoService: ConfiguracaoService) { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required)
    });
    if (this.editarIndex >= 0) {
      this.configForm.setValue({
        nome: this.configEntrada.nome,
        tipo: this.configEntrada.tipo
      });
      this.configForm.get('tipo')?.disable();
    }
  }

  salvarMudanca() {
    let config: ConfiguracaoTable = {
      nome: this.configForm.get('nome')?.value,
      tipo: this.configForm.get('tipo')?.value
    };
    if (this.editarIndex >= 0) {
      this.configuracaoService.editarConfig(this.editarIndex, config);
    } else {
      this.configuracaoService.adicionarConfig(config);
    }
    this.activeModal.dismiss();
  }
}
