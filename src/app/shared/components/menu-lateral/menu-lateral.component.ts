import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginaLoginService } from '../../services/pagina-login.service';
import { MenuLateralService } from '../../services/menu-lateral.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  isMenuOpen = true;
  
  constructor(private router: Router, public paginaLoginService: PaginaLoginService, public menuLateralService: MenuLateralService) {
   }




abreFechaMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

navegarPara(caminho: string){
  this.router.navigate([caminho]);
}

logout() {
  this.paginaLoginService.logout();
  this.router.navigate(['/login']);
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
