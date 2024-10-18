import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuLateralService } from '../../services/menu-lateral.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() aluno: {
    nome: string,
    idade: number,
    email: string,
    id:string,
  } | undefined;

  constructor(private router:Router, private menuLateralService: MenuLateralService) { }

  verMais(id:string): void {
    this.router.navigate(['/cadastro-aluno', id]);
  }

  lancarNota(): void {
    this.router.navigate(['/cadastro-nota']);
  }

  get isAdmin(): boolean {
    let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Administrador';
  }
  
  get isDocente(): boolean {
    let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Docente';
  }
  
  get isAluno(): boolean {
  let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Aluno';
  }
}
