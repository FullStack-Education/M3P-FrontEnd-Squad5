import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuLateralComponent } from "./shared/components/menu-lateral/menu-lateral.component";
import { PaginaLoginService } from './shared/services/pagina-login.service';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuLateralComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labPCP';
  constructor(public router: Router, public paginaLoginService: PaginaLoginService) {}

  get isLoggedIn(): boolean {
    return this.paginaLoginService.isLoggedIn();
  }

 
}
