import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ConfigService } from '../config.service';
import { ConfigTable } from '../model/config-table.model';
import { WebPush } from '../model/web-push.model';

@Component({
  selector: 'app-config-web-push',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config-web-push.component.html',
  styleUrl: './config-web-push.component.css'
})
export class ConfigWebPushComponent {
  config!: ConfigTable;
  id!: number;
  configWebPushForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.route.params.subscribe(params => {
      this.config = this.configService.getConfig(+params['id']);
      this.id = +params['id'];
      if (this.config && this.config.configWebPush) {
        this.preencheForm(this.config.configWebPush);
      }
    })
  }

  iniciarForm() {
    this.configWebPushForm = new FormGroup({
      siteName: new FormControl(''),
      siteAddress: new FormControl(''),
      icon: new FormControl(null),
      message: new FormControl(''),
      textAllow: new FormControl(''),
      textDeny: new FormControl(''),
      notificationTitle: new FormControl(''),
      destinyAdrdress: new FormControl(''),
      linkDestiny: new FormControl(false),
      welcomeMessage: new FormControl('')
    })
  }

  preencheForm(configWebPush: WebPush) {
    this.configWebPushForm.get('siteName')?.setValue(configWebPush.siteName);
    this.configWebPushForm.get('siteAddress')?.setValue(configWebPush.siteAddress);
    this.configWebPushForm.get('message')?.setValue(configWebPush.message);
    this.configWebPushForm.get('textAllow')?.setValue(configWebPush.textAllow);
    this.configWebPushForm.get('textDeny')?.setValue(configWebPush.textDeny);
    this.configWebPushForm.get('notificationTitle')?.setValue(configWebPush.notificationTitle);
    this.configWebPushForm.get('destinyAdrdress')?.setValue(configWebPush.destinyAdrdress);
    this.configWebPushForm.get('linkDestiny')?.setValue(configWebPush.linkDestiny);
    this.configWebPushForm.get('welcomeMessage')?.setValue(configWebPush.welcomeMessage);
  }

  save() {
    this.config.configWebPush = this.configWebPushForm.value;
    this.configService.editConfig(this.id, this.config);
    this.back();
  }

  back() {
    this.router.navigate(['/configuracao']);
  }
}
