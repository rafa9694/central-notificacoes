import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { faEdit, faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ConfiguracaoService } from '../configuracao.service';
import { ModalConfiguracaoComponent } from '../modal-configuracao/modal-configuracao.component';
import { ModalExcluirConfiguracaoComponent } from '../modal-excluir-configuracao/modal-excluir-configuracao.component';

@Component({
  selector: 'app-configuracao-lista',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './configuracao-lista.component.html',
  styleUrl: './configuracao-lista.component.css'
})
export class ConfiguracaoListaComponent {
  configuracoes: ConfiguracaoTable[] = [];
  editarIcon = faEdit;
  excluirIcon = faTrash;
  configurarIcon = faGear;
  configsObservable$!: Subscription;

  constructor(
    private modalService: NgbModal,
    private configuracaoService: ConfiguracaoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.configsObservable$ = this.configuracaoService.listaConfiguracoes$.subscribe(configs => {
      this.configuracoes = configs;
    });
  }

  ngOnDestroy(): void {
    this.configsObservable$.unsubscribe();
  }

  abrirModalConfig(modo: string, index?: number, config?: ConfiguracaoTable) {
    const modalRef = this.modalService.open(ModalConfiguracaoComponent);
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
          this.configuracaoService.excluirConfig(index);
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

  abrirConfiguracaoAdicional(index: number, config: ConfiguracaoTable) {
    if (config.tipo == 'WEB_PUSH') {
      this.router.navigate(['web-push/' + index.toString()], { relativeTo: this.route });
    } else if (config.tipo == 'SMS') {
      this.router.navigate(['sms/' + index.toString()], { relativeTo: this.route });
    } else if (config.tipo == 'EMAIL') {
      this.router.navigate(['email/' + index.toString()], { relativeTo: this.route });
    }
  }
}
