import { Component, ViewChild } from '@angular/core';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgIconComponent } from '@ng-icons/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';
import { PaginaLoginService } from 'app/shared/services/pagina-login.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgIconComponent,
    MenuLateralComponent,
    PreventDefaultDirective,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @ViewChild(MenuLateralComponent) menuLateralComponent!: MenuLateralComponent;
  collapsed = true;
  nomeUsuarioLogado: string = '';

  constructor(
    private router: Router,
    public paginaLoginService: PaginaLoginService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuarioLogado = JSON.parse(
      sessionStorage.getItem('usuarioLogado') || '{}'
    );
    this.nomeUsuarioLogado = usuarioLogado.nome || 'Usuário';
  }
  openSidebar = () => this.menuLateralComponent.open();
  logout() {
    this.paginaLoginService.logout();
    this.router.navigate(['/login']);
  }
}
