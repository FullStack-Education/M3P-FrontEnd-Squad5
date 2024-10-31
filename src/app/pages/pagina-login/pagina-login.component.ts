import { Component } from '@angular/core';
import { PaginaLoginService } from '../../shared/services/pagina-login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent {
  login = {
    id: '',
    email: '',
    senha: '',
    perfil: '',
    nome: ''
  };

  constructor(
    private paginaLoginService: PaginaLoginService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  entrar() {
    // Call the login method to authenticate and retrieve the JWT token
    console.log('Login:', this.login);
    this.usuariosService.login(this.login.email, this.login.senha).subscribe({
      next: (response) => {
        // If login is successful and a token is received
        console.log('respondse:', response);
        console.log('respondse token:', response.valorJWT);
        if (response && response.valorJWT) {
          // Store the token in localStorage
          console.log('respondse:', response.valorJWT);
          localStorage.setItem('jwt_token', response.valorJWT);

          // Optionally, retrieve user profile information if needed
          this.paginaLoginService.getPerfil(this.login.email).subscribe((perfil) => {
            if (perfil) {
              // Use the profile information if needed
              this.login.perfil = perfil.perfil;
              this.login.nome = perfil.nome;
              this.login.id = perfil.id;
            }

            // Navigate to the home page upon successful login
            this.paginaLoginService.login(this.login);
            this.router.navigate(['/home']);
            window.alert('Usuário logado com sucesso!');
          });
        } else {
          window.alert('Login falhou: Token JWT não recebido.');
        }
      },
      error: (err) => {
        console.error('Erro de autenticação', err);
        window.alert('Usuário e/ou senha incorretos');
      }
    });
  }

  criarConta() {
    alert("Funcionalidade em construção");
  }

  esqueciSenha(event: Event) {
    event.preventDefault();
    alert("Funcionalidade em construção");
  }
}


