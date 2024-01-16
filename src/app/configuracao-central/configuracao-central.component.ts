import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfiguracaoCentralComponent } from './modal-configuracao-central/modal-configuracao-central.component';
import { ConfiguracaoTable } from './model/configuracao-table.model';
import { ConfiguracaoCentralService } from './configuracao-central.service';

@Component({
  selector: 'app-configuracao-central',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracao-central.component.html',
  styleUrl: './configuracao-central.component.css'
})
export class ConfiguracaoCentralComponent implements OnInit {
  configuracoes: ConfiguracaoTable[] = [];

  constructor(
    private modalService: NgbModal,
    private configuracaoCentralService: ConfiguracaoCentralService) {

  }

  ngOnInit(): void {
    this.configuracoes = this.configuracaoCentralService.getConfigs();
  }

  abrirModalAdicionar() {
    const modalRef = this.modalService.open(ModalConfiguracaoCentralComponent);
    modalRef.componentInstance.titulo = 'Adicionar Configuração';
  }
}
