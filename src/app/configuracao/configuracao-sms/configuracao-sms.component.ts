import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracaoTable } from '../model/configuracao-table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoService } from '../configuracao.service';
import { ConfiguracaoSMS } from '../model/configuracao-sms.model';

@Component({
  selector: 'app-configuracao-sms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './configuracao-sms.component.html',
  styleUrl: './configuracao-sms.component.css'
})
export class ConfiguracaoSmsComponent implements OnInit {
  config!: ConfiguracaoTable;
  id!: number;
  configSMSForm!: FormGroup;

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
      if (this.config && this.config.configSMS) {
        this.preencheForm(this.config.configSMS);
      }
    })
  }

  preencheForm(configSMS: ConfiguracaoSMS) {
    this.configSMSForm.get('provedor')?.setValue(configSMS.provedor);
    this.configSMSForm.get('login')?.setValue(configSMS.login);
    this.configSMSForm.get('senha')?.setValue(configSMS.senha);
  }

  iniciarForm() {
    this.configSMSForm = new FormGroup({
      provedor: new FormControl(''),
      login: new FormControl(''),
      senha: new FormControl('')
    })
  }

  salvar() {
    this.config.configSMS = this.configSMSForm.value;
    this.configuracaoService.editarConfig(this.id, this.config);
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/configuracao']);
  }
}
