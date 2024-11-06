import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'app/shared/services/auth.service';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-card-docente',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './card-docente.component.html',
  styleUrl: './card-docente.component.scss',
})
export class CardDocenteComponent {
  @Input() docente:
    | {
        nome: string;
        id: string;
        email: string;
      }
    | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  verMais(id: string): void {
    this.router.navigate(['/cadastro-docente', id]);
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
}
