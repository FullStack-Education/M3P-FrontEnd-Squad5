import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() aluno:
    | {
        nome: string;
        idade: number;
        email: string;
        id: string;
      }
    | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  verMais(id: string): void {
    this.router.navigate(['/cadastro-aluno', id]);
  }

  lancarNota(): void {
    this.router.navigate(['/cadastro-nota']);
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
