import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { ConfigTable } from '../model/config-table.model';
import { ConfigEmail } from '../model/config-email.model';

// Component for Email configuration
@Component({
  selector: 'app-config-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config-email.component.html',
  styleUrl: './config-email.component.css'
})
export class ConfigEmailComponent implements OnInit {
  config!: ConfigTable;
  id!: number;
  configEmailForm!: FormGroup;

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
      if (this.config && this.config.configEmail) {
        this.createForm(this.config.configEmail);
      }
    })
  }

  createForm(configEmail: ConfigEmail) {
    this.configEmailForm.get('serverName')?.setValue(configEmail.serverName);
    this.configEmailForm.get('submissionPortal')?.setValue(configEmail.submissionPortal);
    this.configEmailForm.get('login')?.setValue(configEmail.login);
    this.configEmailForm.get('password')?.setValue(configEmail.password);
    this.configEmailForm.get('senderName')?.setValue(configEmail.senderName);
    this.configEmailForm.get('senderEmail')?.setValue(configEmail.senderEmail);
  }

  startForm() {
    this.configEmailForm = new FormGroup({
      serverName: new FormControl(''),
      submissionPortal: new FormControl(''),
      login: new FormControl(null),
      password: new FormControl(''),
      senderName: new FormControl(''),
      senderEmail: new FormControl(''),
      template: new FormControl(null)
    })
  }

  save() {
    this.config.configEmail = this.configEmailForm.value;
    this.configService.editConfig(this.id, this.config);
    this.back();
  }

  back() {
    this.router.navigate(['/configuracao']);
  }
}
