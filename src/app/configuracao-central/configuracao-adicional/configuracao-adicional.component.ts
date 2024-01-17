import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { ConfiguracaoCentralService } from '../configuracao-central.service';

@Component({
  selector: 'app-configuracao-adicional',
  standalone: true,
  imports: [],
  templateUrl: './configuracao-adicional.component.html',
  styleUrl: './configuracao-adicional.component.css'
})
export class ConfiguracaoAdicionalComponent implements OnInit {
  @Input() config!: ConfiguracaoTable;

  constructor(
    private route: ActivatedRoute,
    private configuracaoCentralService: ConfiguracaoCentralService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.config = this.configuracaoCentralService.getConfig(+params['id']);
    })
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
}
