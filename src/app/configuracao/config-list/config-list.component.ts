import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigTable } from '../model/config-table.model';
import { faEdit, faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ConfigService } from '../config.service';
import { ModalConfigComponent } from '../modal-config/modal-config.component';
import { ModalDeleteConfigComponent } from '../modal-delete-config/modal-delete-config.component';

// Component for config listing
@Component({
  selector: 'app-config-lista',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './config-list.component.html',
  styleUrl: './config-list.component.css'
})
export class ConfigListComponent {
  configs: ConfigTable[] = [];
  editIcon = faEdit;
  deleteIcon = faTrash;
  configIcon = faGear;
  configsObservable$!: Subscription;

  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.configsObservable$ = this.configService.listConfigs$.subscribe(configs => {
      this.configs = configs;
    });
  }

  ngOnDestroy(): void {
    this.configsObservable$.unsubscribe();
  }

  // Method to open save or edit modal
  openModalConfig(modo: string, index?: number, config?: ConfigTable) {
    const modalRef = this.modalService.open(ModalConfigComponent);
    if (modo == 'ADD') {
      modalRef.componentInstance.title = 'Adicionar Configuração';
    } else if (modo == 'EDIT') {
      modalRef.componentInstance.title = 'Editar Configuração de ' + config?.name;
      modalRef.componentInstance.config = config;
      modalRef.componentInstance.indexEdit = index;
    }
  }

  // Method to open modal deletion notice
  openModalDeleteConfig(index: number, config: ConfigTable) {
    const modalRef = this.modalService.open(ModalDeleteConfigComponent);
    modalRef.componentInstance.title = 'Excluir configuração de ' + config?.name;

    modalRef.result.then(
      (result) => {
        if (result === 'CONTINUE') {
          this.configService.deleteConfig(index);
        }
      }
    );
  }

  translateTypeConfig(type: string) {
    switch (type) {
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

  openConfigAdditional(index: number, config: ConfigTable) {
    if (config.type == 'WEB_PUSH') {
      this.router.navigate(['web-push/' + index.toString()], { relativeTo: this.route });
    } else if (config.type == 'SMS') {
      this.router.navigate(['sms/' + index.toString()], { relativeTo: this.route });
    } else if (config.type == 'EMAIL') {
      this.router.navigate(['email/' + index.toString()], { relativeTo: this.route });
    }
  }
}
