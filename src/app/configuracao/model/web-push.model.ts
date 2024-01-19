export interface WebPush {
  enderecoDestino: string;
  enderecoSite: string;
  icone: File | null;
  linkDestino: boolean;
  mensagem: string;
  mensagemBoasVindas: string;
  nomeSite: string;
  textoNegar: string;
  textoPermitir: string;
  tituloNotificacao: string;
}