import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PaginaLoginComponent } from './pagina-login.component';
import { PaginaLoginService } from '../../shared/services/pagina-login.service';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../shared/services/auth.service';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ToastType } from 'app/shared/enums/toast-type.enum';

describe('PaginaLoginComponent', () => {
  let component: PaginaLoginComponent;
  let fixture: ComponentFixture<PaginaLoginComponent>;
  let toastService: ToastService;
  let paginaLoginService: PaginaLoginService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, PaginaLoginComponent],
      providers: [
        PaginaLoginService,
        ToastService,
        AuthService,
        FormBuilder,
        { provide: UsuariosService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaLoginComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    paginaLoginService = TestBed.inject(PaginaLoginService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o metodo entrar e mostrar o toast de erro com falha no login', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Erro de autenticação')));
    spyOn(toastService, 'showToast');

    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.entrar();

    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastType.ERROR,
      'Erro!',
      'Usuário e/ou senha incorretos'
    );
  });

  it('deve mostrar um toast de info no criarConta', () => {
    spyOn(toastService, 'showToast');

    component.criarConta();

    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastType.INFO,
      'Informação',
      'Funcionalidade em construção'
    );
  });

  it('deve mostrar um toast de info no esqueciSenha', () => {
    spyOn(toastService, 'showToast');

    component.esqueciSenha();

    expect(toastService.showToast).toHaveBeenCalledWith(
      ToastType.INFO,
      'Informação',
      'Funcionalidade em construção'
    );
  });
});