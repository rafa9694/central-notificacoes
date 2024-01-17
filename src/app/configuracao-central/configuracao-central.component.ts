import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEdit, faTrash, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalConfiguracaoCentralComponent } from './modal-configuracao-central/modal-configuracao-central.component';
import { ConfiguracaoTable } from './model/configuracao-table.model';
import { ConfiguracaoCentralService } from './configuracao-central.service';
import { ModalExcluirConfiguracaoComponent } from './modal-excluir-configuracao/modal-excluir-configuracao.component';

@Component({
  selector: 'app-configuracao-central',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './configuracao-central.component.html',
  styleUrl: './configuracao-central.component.css'
})
export class ConfiguracaoCentralComponent implements OnInit, OnDestroy {
  configuracoes: ConfiguracaoTable[] = [];
  editarIcon = faEdit;
  excluirIcon = faTrash;
  configurarIcon = faGear;
  configsObservable$!: Subscription;

  constructor(
    private modalService: NgbModal,
    private configuracaoCentralService: ConfiguracaoCentralService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.configsObservable$ = this.configuracaoCentralService.listaConfiguracoes$.subscribe(configs => {
      this.configuracoes = configs;
    });
  }


  ngOnDestroy(): void {
    this.configsObservable$.unsubscribe();
  }

  abrirModalConfig(modo: string, index?: number, config?: ConfiguracaoTable) {
    const modalRef = this.modalService.open(ModalConfiguracaoCentralComponent);
    if (modo == 'ADICIONAR') {
      modalRef.componentInstance.titulo = 'Adicionar Configuração';
    } else if (modo == 'EDITAR') {
      modalRef.componentInstance.titulo = 'Editar Configuração de ' + config?.nome;
      modalRef.componentInstance.configEntrada = config;
      modalRef.componentInstance.editarIndex = index;
    }
  }

  abrirModalExcluirConfig(index: number, config: ConfiguracaoTable) {
    const modalRef = this.modalService.open(ModalExcluirConfiguracaoComponent);
    modalRef.componentInstance.titulo = 'Excluir configuração de ' + config?.nome;

    modalRef.result.then(
      (result) => {
        if (result === 'CONTINUAR') {
          this.configuracaoCentralService.excluirConfig(index);
        }
      }
    );
  }

  traduzirTipoConfig(tipo: string) {
    switch (tipo) {
      case 'WEB_PUSH':
        return 'Web Push';
      case 'SMS':
        return 'SMS';
      case 'EMAIL':
        return 'E-mail';
      default:
        return '';
    }
  }

  abrirConfiguracaoAdicional(index: number) {
    this.router.navigate(['adicional/' + index.toString()], { relativeTo: this.route });
  }
}
