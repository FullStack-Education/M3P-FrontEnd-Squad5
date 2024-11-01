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
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find(
        (usuario) =>
          usuario.email === this.login.email &&
          usuario.senha === this.login.senha
      );
      if (usuario) {
        this.paginaLoginService.getPerfil(usuario.email).subscribe((perfil) => {
          if (perfil) {
            this.login.perfil = perfil.perfil;
            this.login.nome = perfil.nome;
            this.login.id = perfil.id;
          } else {
            console.error('Usuário não encontrado');
          }
        });

        setTimeout(() => {
          this.paginaLoginService.login(this.login);
          this.router.navigate(['/home']);
        }, 300);

        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Usuário logado com Sucesso!'
        );
      } else {
        this.toastService.showToast(
          ToastType.ERROR,
          'Erro!',
          'Usuário e/ou senha incorretos'
        );
      }
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
