import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CadastroDocenteComponent } from './cadastro-docente.component';
import { DocentesService } from '../../shared/services/docentes.service';
import { AuthService } from '../../shared/services/auth.service';
import { TurmasService } from '../../shared/services/turmas.service';
import { NotasService } from '../../shared/services/notas.service';
import { Router } from '@angular/router';
import { DocenteInterface } from '../../shared/interfaces/docentes.interface';
import { Profile } from '../../shared/enums/profile.enum';

describe('CadastroDocenteComponent', () => {
  let component: CadastroDocenteComponent;
  let fixture: ComponentFixture<CadastroDocenteComponent>;
  let docenteService: jasmine.SpyObj<DocentesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let turmasService: jasmine.SpyObj<TurmasService>;
  let notasService: jasmine.SpyObj<NotasService>;
  let router: Router;

  beforeEach(async () => {
    const docenteServiceSpy = jasmine.createSpyObj('DocentesService', ['postDocente', 'deleteDocente']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getHeaders']);
    const turmasServiceSpy = jasmine.createSpyObj('TurmasService', ['getTurmasByDocenteName']);
    const notasServiceSpy = jasmine.createSpyObj('NotasService', ['getNotasByDocenteName']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, CadastroDocenteComponent],
      providers: [
        { provide: DocentesService, useValue: docenteServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TurmasService, useValue: turmasServiceSpy },
        { provide: NotasService, useValue: notasServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    docenteService = TestBed.inject(DocentesService) as jasmine.SpyObj<DocentesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    turmasService = TestBed.inject(TurmasService) as jasmine.SpyObj<TurmasService>;
    notasService = TestBed.inject(NotasService) as jasmine.SpyObj<NotasService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário com todos os controles', () => {
    expect(component.docenteForm.contains('nome')).toBeTruthy();
    expect(component.docenteForm.contains('genero')).toBeTruthy();
    expect(component.docenteForm.contains('dataNascimento')).toBeTruthy();
    expect(component.docenteForm.contains('cpf')).toBeTruthy();
    expect(component.docenteForm.contains('rg')).toBeTruthy();
    expect(component.docenteForm.contains('estadoCivil')).toBeTruthy();
    expect(component.docenteForm.contains('telefone')).toBeTruthy();
    expect(component.docenteForm.contains('email')).toBeTruthy();
    expect(component.docenteForm.contains('senha')).toBeTruthy();
    expect(component.docenteForm.contains('naturalidade')).toBeTruthy();
    expect(component.docenteForm.contains('cep')).toBeTruthy();
    expect(component.docenteForm.contains('cidade')).toBeTruthy();
    expect(component.docenteForm.contains('estado')).toBeTruthy();
    expect(component.docenteForm.contains('logradouro')).toBeTruthy();
    expect(component.docenteForm.contains('numero')).toBeTruthy();
    expect(component.docenteForm.contains('complemento')).toBeTruthy();
    expect(component.docenteForm.contains('bairro')).toBeTruthy();
    expect(component.docenteForm.contains('pontoReferencia')).toBeTruthy();
    expect(component.docenteForm.contains('materias')).toBeTruthy();
  });

  it('deve chamar postDocente ao salvar um docente', () => {
    const docenteMock: DocenteInterface = {
      id: '1',
      nome: 'Docente 1',
      email: 'docente1@example.com',
      senha: 'password123',
      perfil: Profile.PROFESSOR,
      idade: 30,
      telefone: '11912345678',
      genero: 'Masculino',
      dataNascimento: '1990-01-01',
      cpf: '123.456.789-09',
      rg: 'MG-12.345.678',
      estadoCivil: 'Solteiro',
      naturalidade: 'país exemplo',
      cep: '01311-000',
      cidade: 'São Paulo',
      estado: 'SP',
      logradouro: 'Avenida Paulista',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Bela Vista',
      pontoReferencia: 'Ponto de Referência',
      materias: ['Matemática']
    };

    docenteService.postDocente.and.returnValue(of(docenteMock));

    component.docenteForm.setValue({
      nome: 'Docente 1',
      genero: 'Masculino',
      dataNascimento: '1990-01-01',
      cpf: '123.456.789-09',
      rg: 'MG-12.345.678',
      estadoCivil: 'Solteiro',
      telefone: '11912345678',
      email: 'docente1@example.com',
      senha: 'password123',
      naturalidade: 'país exemplo',
      cep: '01311-000',
      cidade: 'São Paulo',
      estado: 'SP',
      logradouro: 'Avenida Paulista',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Bela Vista',
      pontoReferencia: 'Ponto de Referência',
      materias: ['Matemática']
    });

    fixture.detectChanges();

    expect(component.docenteForm.valid).toBeTrue();

    component.salvarDocente();

    expect(docenteService.postDocente).toHaveBeenCalled();
  });

  it('deve deletar um docente', () => {
    const docenteMock: DocenteInterface = {
      id: '1',
      nome: 'Docente 1',
      email: 'docente1@example.com',
      senha: 'password123',
      perfil: Profile.PROFESSOR,
      idade: 30,
      telefone: '11912345678',
      genero: 'Masculino',
      dataNascimento: '1990-01-01',
      cpf: '123.456.789-09',
      rg: 'MG-12.345.678',
      estadoCivil: 'Solteiro',
      naturalidade: 'país exemplo',
      cep: '01311-000',
      cidade: 'São Paulo',
      estado: 'SP',
      logradouro: 'Avenida Paulista',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Bela Vista',
      pontoReferencia: 'Ponto de Referência',
      materias: ['Matemática']
    };

    component.isEdit = true;
    component.idDocente = '1';

    turmasService.getTurmasByDocenteName.and.returnValue(of([]));
    notasService.getNotasByDocenteName.and.returnValue(of([]));
    docenteService.deleteDocente.and.returnValue(of({}));

    component.docenteForm.setValue({
      nome: 'Docente 1',
      genero: 'Masculino',
      dataNascimento: '1990-01-01',
      cpf: '123.456.789-09',
      rg: 'MG-12.345.678',
      estadoCivil: 'Solteiro',
      telefone: '11912345678',
      email: 'docente1@example.com',
      senha: 'password123',
      naturalidade: 'país exemplo',
      cep: '01311-000',
      cidade: 'São Paulo',
      estado: 'SP',
      logradouro: 'Avenida Paulista',
      numero: '123',
      complemento: 'Apto 1',
      bairro: 'Bela Vista',
      pontoReferencia: 'Ponto de Referência',
      materias: ['Matemática']
    });

    fixture.detectChanges();

    component.deletarDocente();

    expect(docenteService.deleteDocente).toHaveBeenCalledWith(1);
  });
});