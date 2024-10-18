import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuLateralService } from '../../services/menu-lateral.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-docente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-docente.component.html',
  styleUrl: './card-docente.component.css'
})
export class CardDocenteComponent {
  @Input() docente: {
    nome: string,
    id: string,
    email: string,
  } | undefined;


  constructor(
    private router: Router,
    private menuLateralService: MenuLateralService
  ) { }

  verMais(id:string): void {
    this.router.navigate(['/cadastro-docente', id]);
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
