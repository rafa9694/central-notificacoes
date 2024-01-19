import { Routes } from '@angular/router';

import { ConfigComponent } from './configuracao/config.component';
import { ConfigEmailComponent } from './configuracao/config-email/config-email.component';
import { ConfigListComponent } from './configuracao/config-list/config-list.component';
import { ConfigWebPushComponent } from './configuracao/config-web-push/config-web-push.component';
import { HomeComponent } from './home/home.component';
import { ConfigSmsComponent } from './configuracao/config-sms/config-sms.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'configuracao', component: ConfigComponent, children: [
      { path: '', component: ConfigListComponent },
      { path: 'web-push/:id', component: ConfigWebPushComponent },
      { path: 'email/:id', component: ConfigEmailComponent },
      { path: 'sms/:id', component: ConfigSmsComponent },
    ]
  },
];
