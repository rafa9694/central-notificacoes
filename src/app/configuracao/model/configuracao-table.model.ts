import { ConfiguracaoEmail } from "./configuracao-email.model";
import { ConfiguracaoSMS } from "./configuracao-sms.model";
import { WebPush } from "./web-push.model";

export interface ConfiguracaoTable {
  nome: string;
  tipo: string;
  configWebPush?: WebPush;
  configEmail?: ConfiguracaoEmail;
  configSMS?: ConfiguracaoSMS;
}