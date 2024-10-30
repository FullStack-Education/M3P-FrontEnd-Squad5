import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { PaginaLoginService } from './shared/services/pagina-login.service';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToolbarComponent,
    LoadingBarRouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'labPCP';
  constructor(
    public router: Router,
    public paginaLoginService: PaginaLoginService,
    public readonly loader: LoadingBarService
  ) {}

  get isLoggedIn(): boolean {
    return this.paginaLoginService.isLoggedIn();
  }
}
