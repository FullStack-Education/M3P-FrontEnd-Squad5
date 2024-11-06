import { Component, OnInit } from '@angular/core';
import { PaginaLoginService } from '../../shared/services/pagina-login.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { ToastService } from 'app/shared/services/toast.service';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';
import { ToastType } from 'app/shared/enums/toast-type.enum';
import { AuthService } from 'app/shared/services/auth.service';
import { UsuarioInterface } from 'app/shared/interfaces/usuario.interface';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PreventDefaultDirective,
  ],
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.scss',
})
export class PaginaLoginComponent implements OnInit {
  form: FormGroup;
  authUser: UsuarioInterface;

  constructor(
    private formBuilder: FormBuilder,
    private paginaLoginService: PaginaLoginService,
    private usuariosService: UsuariosService,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  entrar() {
    if (this.form.invalid) {
      this.toastService.showToast(
        ToastType.ERROR,
        'Erro',
        'Revise os campos e tente novamente!'
      );
      return;
    }
    const { email, password } = this.form.value;
    console.log(this.form.value);
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (!response?.valorJWT) {
          this.toastService.showToast(
            ToastType.ERROR,
            'Falha!',
            'Token JWT não recebido.'
          );
          return;
        }
        this.usuariosService.getAuthUsuario().subscribe((usuario) => {
          if (usuario) this.authUser = usuario;

          this.toastService.showToast(
            ToastType.SUCCESS,
            'Sucesso!',
            'Usuário logado com Sucesso!'
          );
          this.paginaLoginService.login(this.authUser);
          this.router.navigate(['/home']);
        });
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
