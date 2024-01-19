import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css'
})
export class ConfiguracaoComponent {
  titulo: string = 'Configurações Cadastradas';
}
