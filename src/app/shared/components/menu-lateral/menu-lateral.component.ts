import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { PaginaLoginService } from '../../services/pagina-login.service';
import {
  NgbCollapseModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NgIconComponent } from '@ng-icons/core';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    PreventDefaultDirective,
    NgbCollapseModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MenuLateralComponent {
  @ViewChild('offcanvas', { static: true }) offcanvas!: TemplateRef<any>;
  closeResult = '';
  isCadastroCollapsed = true;

  constructor(
    private router: Router,
    public paginaLoginService: PaginaLoginService,
    private authService: AuthService,
    private offcanvasService: NgbOffcanvas
  ) {}

  navegarPara(caminho: string) {
    this.router.navigate([caminho]);
    this.offcanvasService.dismiss('navigate');
  }

  logout() {
    this.offcanvasService.dismiss('logout');
    this.paginaLoginService.logout();
    this.router.navigate(['/login']);
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  get isDocente(): boolean {
    return this.authService.isDocente;
  }

  get isAluno(): boolean {
    return this.authService.isAluno;
  }
  open() {
    this.offcanvasService
      .open(this.offcanvas, {
        panelClass: 'offcanvas-panel',
      })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }
}
