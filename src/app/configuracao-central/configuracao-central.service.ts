import { Injectable } from "@angular/core";
import { ConfiguracaoTable } from "./model/configuracao-table.model";



@Injectable({ providedIn: 'root' })
export class ConfiguracaoCentralService {
  private configuracoes: ConfiguracaoTable[] = [
    { nome: 'Aplicação 1', tipo: 'WEB_PUSH' },
    { nome: 'Aplicação 2', tipo: 'SMS' },
    { nome: 'Aplicação 3', tipo: 'EMAIL' }
  ];


  getConfigs() {
    return this.configuracoes;
  }

  addConfig(config: ConfiguracaoTable) {
    this.configuracoes.push(config);
  }
}