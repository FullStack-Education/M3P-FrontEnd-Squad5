import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlunoService } from './aluno.service';
import { AlunoInterface } from '../interfaces/alunos.interface';
import { AuthService } from './auth.service';
import { Profile } from '../enums/profile.enum';
import { HttpHeaders } from '@angular/common/http';

describe('AlunoService', () => {
  let service: AlunoService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getHeaders']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlunoService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(AlunoService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve obter uma lista de alunos', () => {
    const mockAlunos: AlunoInterface[] = [
      { id: '1', nome: 'Aluno 1', email: 'aluno1@example.com', senha: 'password', perfil: Profile.ALUNO, idade: 20, telefone: '123456789' }
    ];

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.getAlunosMatriculados().subscribe(alunos => {
      expect(alunos).toEqual(mockAlunos);
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockAlunos);
  });

  it('deve obter um único aluno pelo id', () => {
    const mockAluno: AlunoInterface = { id: '1', nome: 'Aluno 1', email: 'aluno1@example.com', senha: 'password', perfil: Profile.ALUNO, idade: 20, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.getAluno('1').subscribe(aluno => {
      expect(aluno).toEqual(mockAluno);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockAluno);
  });

  it('deve criar um novo aluno', () => {
    const newAluno: AlunoInterface = { id: '1', nome: 'Aluno 1', email: 'aluno1@example.com', senha: 'password', perfil: Profile.ALUNO, idade: 20, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.postAluno(newAluno).subscribe(response => {
      expect(response).toEqual(newAluno);
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    expect(req.request.body).toEqual(newAluno);
    req.flush(newAluno);
  });

  it('deve atualizar um aluno existente', () => {
    const updatedAluno: AlunoInterface = { id: '1', nome: 'Aluno 1', email: 'aluno1@example.com', senha: 'password', perfil: Profile.ALUNO, idade: 20, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.putAluno(updatedAluno).subscribe(response => {
      expect(response).toEqual(updatedAluno);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    expect(req.request.body).toEqual(updatedAluno);
    req.flush(updatedAluno);
  });

  it('deve excluir um aluno pelo id', () => {
    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.deleteAluno(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush({});
  });
});
