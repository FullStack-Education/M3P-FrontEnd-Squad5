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
import { MenuLateralService } from '../../services/menu-lateral.service';
import {
  NgbCollapseModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NgIconComponent } from '@ng-icons/core';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';

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
    public menuLateralService: MenuLateralService,
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
  open() {
    this.offcanvasService
      .open(this.offcanvas, {
        panelClass: 'offcanvas-panel',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
