import { Injectable } from "@angular/core";
import { ConfiguracaoTable } from "./model/configuracao-table.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ConfiguracaoCentralService {
  private configuracoes: BehaviorSubject<ConfiguracaoTable[]> = new BehaviorSubject<Array<any>>([
    { nome: 'Aplicação 1', tipo: 'WEB_PUSH' },
    { nome: 'Aplicação 2', tipo: 'SMS' },
    { nome: 'Aplicação 3', tipo: 'EMAIL' }
  ]);

  listaConfiguracoes$ = this.configuracoes.asObservable();

  adicionarConfig(config: ConfiguracaoTable) {
    const configsAtuais = this.configuracoes.getValue();
    configsAtuais.push(config);
    this.configuracoes.next([...configsAtuais]);
  }

  editarConfig(index: number, config: ConfiguracaoTable) {
    const configsAtuais = this.configuracoes.getValue();
    configsAtuais[index].nome = config.nome;
    this.configuracoes.next([...configsAtuais]);
  }

  excluirConfig(indexExcluir: number) {
    let configsAtuais = this.configuracoes.getValue();
    configsAtuais = configsAtuais.filter((config, index) => { return index != indexExcluir });
    this.configuracoes.next([...configsAtuais]);
  }

  getConfig(index: number) {
    const configsAtuais = this.configuracoes.getValue();
    return configsAtuais[index];
  }
}