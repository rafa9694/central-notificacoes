import { Routes } from '@angular/router';

import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { ConfiguracaoEmailComponent } from './configuracao/configuracao-email/configuracao-email.component';
import { ConfiguracaoListaComponent } from './configuracao/configuracao-lista/configuracao-lista.component';
import { ConfiguracaoWebPushComponent } from './configuracao/configuracao-web-push/configuracao-web-push.component';
import { HomeComponent } from './home/home.component';
import { ConfiguracaoSmsComponent } from './configuracao/configuracao-sms/configuracao-sms.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'configuracao', component: ConfiguracaoComponent, children: [
      { path: '', component: ConfiguracaoListaComponent },
      { path: 'web-push/:id', component: ConfiguracaoWebPushComponent },
      { path: 'email/:id', component: ConfiguracaoEmailComponent },
      { path: 'sms/:id', component: ConfiguracaoSmsComponent },
    ]
  },
];
