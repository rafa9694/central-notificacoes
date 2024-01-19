import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ConfiguracaoService } from '../configuracao.service';
import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { WebPush } from '../model/web-push.model';

@Component({
  selector: 'app-configuracao-web-push',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './configuracao-web-push.component.html',
  styleUrl: './configuracao-web-push.component.css'
})
export class ConfiguracaoWebPushComponent {
  config!: ConfiguracaoTable;
  id!: number;
  configWebPushForm!: FormGroup;
  arquivoSelecionado: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configuracaoService: ConfiguracaoService) {
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.route.params.subscribe(params => {
      this.config = this.configuracaoService.getConfig(+params['id']);
      this.id = +params['id'];
      if (this.config && this.config.configWebPush) {
        this.preencheForm(this.config.configWebPush);
      }
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

  iniciarForm() {
    this.configWebPushForm = new FormGroup({
      nomeSite: new FormControl(''),
      enderecoSite: new FormControl(''),
      icone: new FormControl(null),
      mensagem: new FormControl(''),
      textoPermitir: new FormControl(''),
      textoNegar: new FormControl(''),
      tituloNotificacao: new FormControl(''),
      enderecoDestino: new FormControl(''),
      linkDestino: new FormControl(false),
      mensagemBoasVindas: new FormControl('')
    })
  }

  preencheForm(configWebPush: WebPush) {
    this.configWebPushForm.get('nomeSite')?.setValue(configWebPush.nomeSite);
    this.configWebPushForm.get('enderecoSite')?.setValue(configWebPush.enderecoSite);
    this.configWebPushForm.get('mensagem')?.setValue(configWebPush.mensagem);
    this.configWebPushForm.get('textoPermitir')?.setValue(configWebPush.textoPermitir);
    this.configWebPushForm.get('textoNegar')?.setValue(configWebPush.textoNegar);
    this.configWebPushForm.get('tituloNotificacao')?.setValue(configWebPush.tituloNotificacao);
    this.configWebPushForm.get('enderecoDestino')?.setValue(configWebPush.enderecoDestino);
    this.configWebPushForm.get('linkDestino')?.setValue(configWebPush.linkDestino);
    this.configWebPushForm.get('mensagemBoasVindas')?.setValue(configWebPush.mensagemBoasVindas);
  }

  salvar() {
    this.config.configWebPush = this.configWebPushForm.value;
    this.configuracaoService.editarConfig(this.id, this.config);
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/configuracao']);
  }
}
