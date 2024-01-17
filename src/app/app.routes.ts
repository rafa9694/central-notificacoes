import { ConfiguracaoAdicionalComponent } from './configuracao-central/configuracao-adicional/configuracao-adicional.component';
import { ConfiguracaoCentralComponent } from './configuracao-central/configuracao-central.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'configuracao', component: ConfiguracaoCentralComponent },
  { path: 'configuracao', component: ConfiguracaoCentralComponent },
  { path: 'configuracao/adicional/:id', component: ConfiguracaoAdicionalComponent }
];
