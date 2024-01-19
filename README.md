# Central Notificacoes

Essa aplicação foi construída com Angular versão 17.0.7. Afim de atender ao teste técnico 'Teste de Fullstack Sistema de notificação de mensagem'.

## Development server

Para rodar a aplicação localmente basta utilizar o comando `ng serve` e navegar para `http://localhost:4200/`.

## Resultado Teste
O teste técnico foi dividido nas seguintes as atividades:

- Tela de cadastro / login
- Tela de configuração
- Tela de setup web push
- Tela de setup email
- Tela de setup sms
- Tela de histórico de notificações
- Tela de envio manual das notificações

No código dessa aplicação foram feito apenas os itens e dados falsos e mokados: 
- Tela de configuração
- Tela de setup web push
- Tela de setup email
- Tela de setup sms

## Tela de configuração
A Tela de configuração é composta por uma tabela com as aplicações que o usuário cadastrou. Essa tela possui 4 botões de ação.

O Botão Adicionar que fica ao final da tabela permite criar novas aplicações para serem configuradas.

O botão com o ícone de edição presente na linha da tabela permite editar as informações da aplicação cadastrada.

O botão com o ícone de deleção presente na linha da tabela permite a deleção deste registro de aplicação.

O botão com o ícone de configuração permite ao usuário fazer as configurações adicionais de cada tipo de aplicação.

## Tela de setup web push
A Tela de setup web push permite preencher os campos referentes às configurações de informações necessárias para o envio de notificações do tipo web push. Sendo necessário apertar o botão Salvar para persistir as alterações.

## Tela de setup email
A Tela de setup email permite preencher os campos referentes às configurações de informações necessárias para o envio de notificações do tipo email. Sendo necessário apertar o botão Salvar para persistir as alterações.

## Tela de setup sms
A Tela de setup sms permite preencher os campos referentes às configurações de informações necessárias para o envio de notificações do tipo sms. Sendo necessário apertar o botão Salvar para persistir as alterações.