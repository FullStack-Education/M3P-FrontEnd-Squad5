import { Component, OnInit } from '@angular/core';
import { NotasService } from '../../shared/services/notas.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TurmaInterface } from '../../shared/interfaces/turma.interface';
import { NotaInterface } from '../../shared/interfaces/nota.interface';
import { TurmasService } from '../../shared/services/turmas.service';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';



@Component({
  selector: 'app-notas-alunos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-alunos.component.html',
  styleUrl: './notas-alunos.component.css'
})
export class NotasAlunosComponent implements OnInit {

  notas: any[] = [];
  turmas: TurmaInterface[] = [];
  alunoName: string = '';
  perfilLogado: string = '';


  constructor(
    private notasService: NotasService,
    private turmaService: TurmasService,
    private menuLateralService: MenuLateralService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.alunoName = this.getNameUsuarioLogado();
    this.perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    this.getNotasAluno();

    this.turmaService.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
  }

  getNotasAluno() {
    this.notasService.getNotasByAlunoName(this.alunoName).subscribe((notas) => {
      ;
      this.notas = notas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    });
  }

  agruparPorMateria() {
    const materias = new Map<string, any>();

    this.notas.forEach(nota => {
      const materiaNome = nota.materia;

      if (!materias.has(materiaNome)) {
        materias.set(materiaNome, { nome: materiaNome, notas: [] });
      }

      materias.get(materiaNome).notas.push(nota);
    });

    return Array.from(materias.values());
  }




  getIdUsuarioLogado(): string {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    return usuarioLogado.id || '';
  }

  getNameUsuarioLogado(): string {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    return usuarioLogado.nome || '';
  }

  get isAdmin(): boolean {
    return this.perfilLogado === 'Administrador';
  }

  get isDocente(): boolean {
    return this.perfilLogado === 'Docente';
  }

  get isAluno(): boolean {
    return this.perfilLogado === 'Aluno';
  }

}
