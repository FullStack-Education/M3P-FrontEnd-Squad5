import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CadastroAlunoComponent } from './cadastro-aluno.component';
import { AlunoService } from '../../shared/services/aluno.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlunoInterface } from '../../shared/interfaces/alunos.interface';
import { Profile } from '../../shared/enums/profile.enum';

describe('CadastroAlunoComponent', () => {
  let component: CadastroAlunoComponent;
  let fixture: ComponentFixture<CadastroAlunoComponent>;
  let alunoService: jasmine.SpyObj<AlunoService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['postAluno']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getHeaders']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, CadastroAlunoComponent],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder
      ]
    }).compileComponents();

    alunoService = TestBed.inject(AlunoService) as jasmine.SpyObj<AlunoService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário com todos os controles', () => {
    expect(component.alunoForm.contains('nome')).toBeTruthy();
    expect(component.alunoForm.contains('genero')).toBeTruthy();
    expect(component.alunoForm.contains('dataNascimento')).toBeTruthy();
    expect(component.alunoForm.contains('cpf')).toBeTruthy();
    expect(component.alunoForm.contains('rg')).toBeTruthy();
    expect(component.alunoForm.contains('estadoCivil')).toBeTruthy();
    expect(component.alunoForm.contains('telefone')).toBeTruthy();
    expect(component.alunoForm.contains('email')).toBeTruthy();
    expect(component.alunoForm.contains('senha')).toBeTruthy();
    expect(component.alunoForm.contains('naturalidade')).toBeTruthy();
    expect(component.alunoForm.contains('cep')).toBeTruthy();
    expect(component.alunoForm.contains('cidade')).toBeTruthy();
    expect(component.alunoForm.contains('estado')).toBeTruthy();
    expect(component.alunoForm.contains('logradouro')).toBeTruthy();
    expect(component.alunoForm.contains('numero')).toBeTruthy();
    expect(component.alunoForm.contains('complemento')).toBeTruthy();
    expect(component.alunoForm.contains('bairro')).toBeTruthy();
    expect(component.alunoForm.contains('pontoReferencia')).toBeTruthy();
    expect(component.alunoForm.contains('turma')).toBeTruthy();
  });

  it('deve chamar postAluno ao salvar um aluno', () => {
    const alunoMock: AlunoInterface = {
      id: '1',
      nome: 'Aluno exemplo',
      email: 'aluno1@example.com',
      senha: 'password123',
      perfil: Profile.ALUNO,
      idade: 20,
      telefone: '11912345678',
      genero: 'Masculino',
      dataNascimento: '2000-01-01',
      cpf: '164.413.530-24',
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
      turma: ['1']
    };

    alunoService.postAluno.and.returnValue(of(alunoMock));

    component.alunoForm.setValue({
      nome: 'Aluno exemplo',
      genero: 'Masculino',
      dataNascimento: '2000-01-01',
      cpf: '164.413.530-24',
      rg: 'MG-12.345.678',
      estadoCivil: 'Solteiro',
      telefone: '11912345678',
      email: 'aluno1@example.com',
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
      turma: ['1']
    });
  
    fixture.detectChanges();

    expect(component.alunoForm.valid).toBeTrue();
  
    component.salvarAluno();
  
    expect(alunoService.postAluno).toHaveBeenCalled();
  });
});
