import { Component } from '@angular/core';
import { PaginaLoginService } from '../../shared/services/pagina-login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { ToastService } from 'app/shared/services/toast.service';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';
import { ToastType } from 'app/shared/enums/toast-type.enum';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [FormsModule, CommonModule, PreventDefaultDirective],
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.scss',
})
export class PaginaLoginComponent {
  login = {
    id: '',
    email: '',
    senha: '',
    perfil: '',
    nome: '',
  };

  constructor(
    private paginaLoginService: PaginaLoginService,
    private usuariosService: UsuariosService,
    private router: Router,
    private toastService: ToastService
  ) {}

  entrar() {
    // Call the login method to authenticate and retrieve the JWT token
    console.log('Login:', this.login);
    this.usuariosService.login(this.login.email, this.login.senha).subscribe({
      next: (response) => {
        
        console.log('respondse:', response);
        console.log('respondse token:', response.valorJWT);
        if (response && response.valorJWT) {
          // Store the token in localStorage
          console.log('respondse:', response.valorJWT);
          localStorage.setItem('jwt_token', response.valorJWT);

          // Optionally, retrieve user profile information if needed

          this.usuariosService.getUsuario(this.login.email).subscribe((usuario) => {
            if (usuario) {
              this.login.perfil = usuario.perfil;
              this.login.nome = usuario.nome;
              this.login.id = usuario.id;
            }

            // Navigate to the home page upon successful login
            this.paginaLoginService.login(this.login);
            this.router.navigate(['/home']);

            this.toastService.showToast(
              ToastType.SUCCESS,
              'Sucesso!',
              'Usuário logado com Sucesso!'
            );
          });

          // this.paginaLoginService
          //   .getPerfil(this.login.email)
          //   .subscribe((perfil) => {
          //     if (perfil) {
          //       // Use the profile information if needed
          //       this.login.perfil = perfil.perfil;
          //       this.login.nome = perfil.nome;
          //       this.login.id = perfil.id;
          //     }

          //     // Navigate to the home page upon successful login
          //     this.paginaLoginService.login(this.login);
          //     this.router.navigate(['/home']);

          //     this.toastService.showToast(
          //       ToastType.SUCCESS,
          //       'Sucesso!',
          //       'Usuário logado com Sucesso!'
          //     );
          //   });
         
        }else {
          this.toastService.showToast(
            ToastType.ERROR,
            'Falha!',
            'Token JWT não recebido.'
          );
        }
      },
      error: (err) => {
        console.error('Erro de autenticação', err);

        this.toastService.showToast(
          ToastType.ERROR,
          'Erro!',
          'Usuário e/ou senha incorretos'
        );
      },
    });
  }

  criarConta() {
    this.toastService.showToast(
      ToastType.INFO,
      'Informação',
      'Funcionalidade em construção'
    );
  }

  esqueciSenha() {
    this.toastService.showToast(
      ToastType.INFO,
      'Informação',
      'Funcionalidade em construção'
    );
  }
}
