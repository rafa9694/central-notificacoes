import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoService } from '../configuracao.service';
import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { ConfiguracaoEmail } from '../model/configuracao-email.model';

@Component({
  selector: 'app-configuracao-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './configuracao-email.component.html',
  styleUrl: './configuracao-email.component.css'
})
export class ConfiguracaoEmailComponent implements OnInit {
  config!: ConfiguracaoTable;
  id!: number;
  configEmailForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configuracaoService: ConfiguracaoService
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.route.params.subscribe(params => {
      this.config = this.configuracaoService.getConfig(+params['id']);
      this.id = +params['id'];
      if (this.config && this.config.configEmail) {
        this.preencheForm(this.config.configEmail);
      }
    })
  }

  preencheForm(configEmail: ConfiguracaoEmail) {
    this.configEmailForm.get('nomeServidor')?.setValue(configEmail.nomeServidor);
    this.configEmailForm.get('portalEnvio')?.setValue(configEmail.portalEnvio);
    this.configEmailForm.get('login')?.setValue(configEmail.login);
    this.configEmailForm.get('senha')?.setValue(configEmail.senha);
    this.configEmailForm.get('nomeRemetente')?.setValue(configEmail.nomeRemetente);
    this.configEmailForm.get('emailRemetente')?.setValue(configEmail.emailRemetente);
  }

  iniciarForm() {
    this.configEmailForm = new FormGroup({
      nomeServidor: new FormControl(''),
      portalEnvio: new FormControl(''),
      login: new FormControl(null),
      senha: new FormControl(''),
      nomeRemetente: new FormControl(''),
      emailRemetente: new FormControl(''),
      template: new FormControl(null)
    })
  }

  salvar() {
    this.config.configEmail = this.configEmailForm.value;
    this.configuracaoService.editarConfig(this.id, this.config);
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/configuracao']);
  }
}
