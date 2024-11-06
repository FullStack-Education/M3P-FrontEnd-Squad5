import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocentesService } from './docentes.service';
import { DocenteInterface } from '../interfaces/docentes.interface';
import { AuthService } from './auth.service';
import { Profile } from '../enums/profile.enum';
import { HttpHeaders } from '@angular/common/http';

describe('DocentesService', () => {
  let service: DocentesService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getHeaders']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DocentesService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(DocentesService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve obter uma lista de docentes', () => {
    const mockDocentes: DocenteInterface[] = [
      { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' }
    ];

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.getDocentesMatriculados().subscribe(docentes => {
      expect(docentes).toEqual(mockDocentes);
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockDocentes);
  });

  it('deve obter um único docente pelo id', () => {
    const mockDocente: DocenteInterface = { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.getDocente('1').subscribe(docente => {
      expect(docente).toEqual(mockDocente);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush(mockDocente);
  });

  it('deve postar um novo docente', () => {
    const newDocente: DocenteInterface = { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.postDocente(newDocente).subscribe(response => {
      expect(response).toEqual(newDocente);
    });

    const req = httpMock.expectOne(service['API_URL']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    expect(req.request.body).toEqual(newDocente);
    req.flush(newDocente);
  });

  it('deve atualizar um docente existente', () => {
    const updatedDocente: DocenteInterface = { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' };

    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.putDocente(updatedDocente).subscribe(response => {
      expect(response).toEqual(updatedDocente);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    expect(req.request.body).toEqual(updatedDocente);
    req.flush(updatedDocente);
  });

  it('deve deletar um docente pelo id', () => {
    authService.getHeaders.and.returnValue(new HttpHeaders({ 'Authorization': 'Bearer token' }));

    service.deleteDocente(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['API_URL']}/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush({});
  });
});