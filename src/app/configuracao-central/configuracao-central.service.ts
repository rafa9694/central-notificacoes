import { Injectable } from "@angular/core";
import { ConfiguracaoTable } from "./model/configuracao-table.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ConfiguracaoCentralService {
  private configuracoes: BehaviorSubject<ConfiguracaoTable[]> = new BehaviorSubject<Array<any>>([]);

  listaConfiguracoes$ = this.configuracoes.asObservable();

  constructor() {
    const dadosSalvos = this.obterDadosDoLocalStorage();
    this.atualizarDados(dadosSalvos);
  }

  private atualizarDados(novosDados: ConfiguracaoTable[]): void {
    this.configuracoes.next(novosDados);
    this.salvarDadosNoLocalStorage(novosDados);
  }

  private salvarDadosNoLocalStorage(dados: ConfiguracaoTable[]): void {
    localStorage.setItem('listaConfig', JSON.stringify(dados));
  }

  private obterDadosDoLocalStorage(): ConfiguracaoTable[] {
    const dadosArmazenados = localStorage.getItem('listaConfig');
    return dadosArmazenados ? JSON.parse(dadosArmazenados) : [];
  }

  adicionarConfig(config: ConfiguracaoTable) {
    const configsAtuais = this.configuracoes.getValue();
    configsAtuais.push(config);
    this.atualizarDados(configsAtuais);
  }

  editarConfig(index: number, config: ConfiguracaoTable) {
    const configsAtuais = this.configuracoes.getValue();
    configsAtuais[index].nome = config.nome;
    this.atualizarDados(configsAtuais);
  }

  excluirConfig(indexExcluir: number) {
    let configsAtuais = this.configuracoes.getValue();
    configsAtuais = configsAtuais.filter((config, index) => { return index != indexExcluir });
    this.atualizarDados(configsAtuais);
  }

  getConfig(index: number) {
    const listConfig = localStorage.getItem('listConfig');
    const configsAtuais = this.configuracoes.getValue();
    return configsAtuais[index];
  }
}