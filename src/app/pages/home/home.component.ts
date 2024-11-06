import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { AlunoService } from '../../shared/services/aluno.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { DocentesService } from '../../shared/services/docentes.service';
import { TurmasService } from '../../shared/services/turmas.service';
import { EstatisticasInterface } from '../../shared/interfaces/estatisticas.interface';
import { FormsModule } from '@angular/forms';
import { CursosExtraService } from '../../shared/services/cursos-extra.service';
import { MateriasService } from '../../shared/services/materias.service';
import { NotasService } from '../../shared/services/notas.service';
import { NotaInterface } from '../../shared/interfaces/nota.interface';
import { CursosInterface } from '../../shared/interfaces/cursos.interface';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { PreventDefaultDirective } from 'app/shared/directives/prevent-default.directive';
import { AuthService } from 'app/shared/services/auth.service';
import { AlunoInterface } from 'app/shared/interfaces/alunos.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    NgIconComponent,
    PreventDefaultDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  alunos: AlunoInterface[] = [];

  estatisticas: EstatisticasInterface = {
    numeroAlunos: 0,
    numeroDocentes: 0,
    numeroTurmas: 0,
  };

  valorBusca: string = '';

  alunosEncontrados: AlunoInterface[] = [];

  notas: NotaInterface[] = [];
  materias: CursosInterface[] = [];
  cursosExtras: CursosInterface[] = [];
  alunoName: string = '';

  constructor(
    private alunoService: AlunoService,
    private docenteService: DocentesService,
    private turmaService: TurmasService,
    private materiasService: MateriasService,
    private notasService: NotasService,
    private cursosExtraService: CursosExtraService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.alunoName = this.getNameUsuarioLogado();
    this.carregarAlunos();
    this.carregarEstatisticas();
    this.getNotasAluno();

    this.materiasService
      .getMaterias()
      .subscribe((data) => (this.materias = data));
    this.cursosExtraService
      .getCursosExtras()
      .subscribe((data) => (this.cursosExtras = data));
  }

  getNotasAluno() {
    this.notasService.getNotasByAlunoName(this.alunoName).subscribe((notas) => {
      this.notas = notas.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
    });
  }

  carregarEstatisticas(): void {
    this.alunoService.numeroAlunosMatriculados().subscribe((numeroAlunos) => {
      console.log(numeroAlunos);
      this.estatisticas.numeroAlunos = numeroAlunos;
      localStorage.getItem('jwt_token');
    });
    this.docenteService
      .numeroDocentesMatriculados()
      .subscribe((numeroDocentes) => {
        console.log(numeroDocentes);
        this.estatisticas.numeroDocentes = numeroDocentes;
      });
    this.turmaService.numeroTurmasCadastradas().subscribe((numeroTurmas) => {
      this.estatisticas.numeroTurmas = numeroTurmas;
    });
  }

  carregarAlunos(): void {
    this.alunoService.getAlunosMatriculados().subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  buscaAluno() {
    if (this.valorBusca) {
      this.alunosEncontrados = this.alunos.filter(
        (aluno) =>
          aluno.nome.toLowerCase().includes(this.valorBusca.toLowerCase()) ||
          //aluno.telefone
          aluno.email.toLowerCase().includes(this.valorBusca.toLowerCase())
      );
    } else {
      this.alunosEncontrados = this.alunos;
    }
  }

  selecionaPrimeiroAluno() {
    this.valorBusca = this.alunosEncontrados[0].nome;
    this.buscaAluno();
  }

  navegarPaginaNotasAluno() {
    this.router.navigate(['/notas']);
  }

  getNameUsuarioLogado(): string {
    const usuarioLogado = JSON.parse(
      sessionStorage.getItem('usuarioLogado') || '{}'
    );
    return usuarioLogado.nome || '';
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  get isDocente(): boolean {
    return this.authService.isDocente;
  }

  get isAluno(): boolean {
    return this.authService.isAluno;
  }
}
