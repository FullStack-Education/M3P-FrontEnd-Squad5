import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  nomeUsuarioLogado: string = '';

  ngOnInit() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    this.nomeUsuarioLogado = usuarioLogado.nome || 'Usuário';
  }

}
