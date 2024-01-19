import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigTable } from '../model/config-table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { ConfigSMS } from '../model/config-sms.model';


// Component for SMS configuration
@Component({
  selector: 'app-config-sms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config-sms.component.html',
  styleUrl: './config-sms.component.css'
})
export class ConfigSmsComponent implements OnInit {
  config!: ConfigTable;
  id!: number;
  configSMSForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.startForm();
    this.route.params.subscribe(params => {
      this.config = this.configService.getConfig(+params['id']);
      this.id = +params['id'];
      if (this.config && this.config.configSMS) {
        this.createForm(this.config.configSMS);
      }
    })
  }

  createForm(configSMS: ConfigSMS) {
    this.configSMSForm.get('provider')?.setValue(configSMS.provider);
    this.configSMSForm.get('login')?.setValue(configSMS.login);
    this.configSMSForm.get('password')?.setValue(configSMS.password);
  }

  startForm() {
    this.configSMSForm = new FormGroup({
      provider: new FormControl(''),
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  save() {
    this.config.configSMS = this.configSMSForm.value;
    this.configService.editConfig(this.id, this.config);
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/configuracao']);
  }
}
