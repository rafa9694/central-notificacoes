import { Injectable } from "@angular/core";
import { ConfiguracaoTable } from "./model/configuracao-table.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ConfiguracaoService {
  private configuracoes: BehaviorSubject<ConfiguracaoTable[]> = new BehaviorSubject<Array<any>>([
    {
      nome: 'Aplicação 1', tipo: 'WEB_PUSH', configWebPush: {
        enderecoDestino: "https://www.destino.com.br",
        enderecoSite: "https://www.webpush.com.br",
        icone: null,
        linkDestino: true,
        mensagem: "Essa é uma mensagem de permissão",
        mensagemBoasVindas: "Essa é uma mensagem de texto ",
        nomeSite: "Site Web Push",
        textoNegar: "Essa é uma mensagem do botão negar",
        textoPermitir: "Essa é a mensagem do botão permitir",
        tituloNotificacao: "Boas vindas"
      }
    },
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