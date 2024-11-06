import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListagemDocentesComponent } from './listagem-docentes.component';
import { DocentesService } from '../../shared/services/docentes.service';
import { AuthService } from '../../shared/services/auth.service';
import { of } from 'rxjs';
import { DocenteInterface } from '../../shared/interfaces/docentes.interface';
import { Profile } from '../../shared/enums/profile.enum';

describe('ListagemDocentesComponent', () => {
  let component: ListagemDocentesComponent;
  let fixture: ComponentFixture<ListagemDocentesComponent>;
  let docenteService: jasmine.SpyObj<DocentesService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const docenteServiceSpy = jasmine.createSpyObj('DocentesService', ['getDocentesMatriculados']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin', 'isDocente', 'isAluno']);

    docenteServiceSpy.getDocentesMatriculados.and.returnValue(of([{ id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' }]));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ListagemDocentesComponent],
      providers: [
        { provide: DocentesService, useValue: docenteServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    docenteService = TestBed.inject(DocentesService) as jasmine.SpyObj<DocentesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de docentes ao inicializar', () => {
    component.ngOnInit();

    expect(component.docentes.length).toBe(1);
    expect(component.docentes[0].nome).toBe('Docente 1');
    expect(docenteService.getDocentesMatriculados).toHaveBeenCalled();
  });

  it('deve filtrar docentes pelo nome ou id', () => {
    component.docentes = [
      { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' },
      { id: '2', nome: 'Docente 2', email: 'docente2@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 35, telefone: '987654321' }
    ];
    component.valorBusca = 'Docente 1';

    component.buscaDocente();

    expect(component.docentesEncontrados.length).toBe(1);
    expect(component.docentesEncontrados[0].nome).toBe('Docente 1');
  });

  it('deve selecionar o primeiro docente encontrado', () => {
    component.docentesEncontrados = [
      { id: '1', nome: 'Docente 1', email: 'docente1@example.com', senha: 'password', perfil: Profile.PROFESSOR, idade: 30, telefone: '123456789' }
    ];

    component.selecionaPrimeiroDocente();

    expect(component.valorBusca).toBe('Docente 1');
  });
});
