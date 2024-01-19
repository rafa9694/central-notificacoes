import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Central component of the config module
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  title: string = 'Configurações Cadastradas';
}
