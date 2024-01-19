import { Injectable } from "@angular/core";
import { ConfigTable } from "./model/config-table.model";
import { BehaviorSubject } from "rxjs";

// Service to manage configurations
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configs: BehaviorSubject<ConfigTable[]> = new BehaviorSubject<Array<ConfigTable>>([
    {
      name: 'Aplicação 1', type: 'WEB_PUSH', configWebPush: {
        destinyAdrdress: "https://www.destino.com.br",
        siteAddress: "https://www.webpush.com.br",
        icon: null,
        linkDestiny: true,
        message: "Essa é uma mensagem de permissão",
        welcomeMessage: "Essa é uma mensagem de texto ",
        siteName: "Site Web Push",
        textDeny: "Essa é uma mensagem do botão negar",
        textAllow: "Essa é a mensagem do botão permitir",
        notificationTitle: "Boas vindas"
      }
    },
    { name: 'Aplicação 2', type: 'SMS' },
    { name: 'Aplicação 3', type: 'EMAIL' }
  ]);

  listConfigs$ = this.configs.asObservable();

  addConfig(config: ConfigTable) {
    const configsAtuais = this.configs.getValue();
    configsAtuais.push(config);
    this.configs.next([...configsAtuais]);
  }

  editConfig(index: number, config: ConfigTable) {
    const configsAtuais = this.configs.getValue();
    configsAtuais[index].name = config.name;
    this.configs.next([...configsAtuais]);
  }

  deleteConfig(indexExcluir: number) {
    let configsAtuais = this.configs.getValue();
    configsAtuais = configsAtuais.filter((config, index) => { return index != indexExcluir });
    this.configs.next([...configsAtuais]);
  }

  getConfig(index: number) {
    const configsAtuais = this.configs.getValue();
    return configsAtuais[index];
  }
}