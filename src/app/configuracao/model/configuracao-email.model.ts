export interface ConfiguracaoEmail {
  emailRemetente: string;
  login: string;
  nomeRemetente: string;
  nomeServidor: string;
  portalEnvio: string;
  senha: string;
  template: File | null;
}