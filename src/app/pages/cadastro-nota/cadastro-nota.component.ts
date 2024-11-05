import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NotasService } from '../../shared/services/notas.service';
import { NotaInterface } from '../../shared/interfaces/nota.interface';
import { DocentesService } from '../../shared/services/docentes.service';
import { TurmasService } from '../../shared/services/turmas.service';
import { AlunoService } from '../../shared/services/aluno.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ToastType } from 'app/shared/enums/toast-type.enum';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-cadastro-nota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-nota.component.html',
  styleUrl: './cadastro-nota.component.scss',
})
export class CadastroNotaComponent implements OnInit {
  notaForm!: FormGroup;
  isEdit = false;
  idNota: string | undefined;
  perfilLogado: string = '';
  docentes: any[] = [];
  turmas: any[] = [];
  alunos: any[] = [];

  materias = [
    'Matemática',
    'Física',
    'Química',
    'História',
    'Geografia',
    'Biologia',
  ];

  constructor(
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private notaService: NotasService,
    private docentesService: DocentesService,
    private turmaService: TurmasService,
    private alunoService: AlunoService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.idNota = this.activatedRoute.snapshot.params['id'];

    if (this.idNota) {
      this.isEdit = true;
      this.notaService.getNota(this.idNota).subscribe((nota) => {
        if (nota) {
          this.notaForm.patchValue(nota);
        }
      });
    }

    this.notaForm = new FormGroup({
      turma: new FormControl(''),
      docente: new FormControl('', Validators.required),
      materia: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      aluno: new FormControl('', Validators.required),
      nota: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10),
      ]),
    });

    this.turmaService.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });

    this.alunoService.getAlunosMatriculados().subscribe((alunos) => {
      this.alunos = alunos;
    });

    if (this.perfilLogado === 'Docente') {
      const docenteNome = this.getNomeUsuarioLogado();
      this.docentes = [{ nome: docenteNome }];
      this.notaForm.controls['docente'].disable();
    } else if (this.perfilLogado === 'Administrador') {
      this.docentesService.getDocentesMatriculados().subscribe((docentes) => {
        this.docentes = docentes;
      });
    }
  }

  salvarNota() {
    if (this.notaForm.valid) {
      if (this.perfilLogado === 'Docente') {
        this.notaForm.controls['docente'].setValue(this.getNomeUsuarioLogado());
      }

      const novaNota: NotaInterface = {
        ...this.notaForm.value,
        id: this.idNota ? this.idNota : this.gerarId(),
        docente: this.notaForm.controls['docente'].value,
      };
      this.notaService.postNota(novaNota).subscribe((retorno) => {
        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Nota criada com sucesso'
        );
      });
    } else {
      this.toastService.showToast(
        ToastType.ERROR,
        'Erro!',
        'Cheque os campos obrigatórios'
      );
    }
  }

  getNomeUsuarioLogado(): string {
    const usuarioLogado = JSON.parse(
      sessionStorage.getItem('usuarioLogado') || '{}'
    );
    return usuarioLogado.nome || '';
  }

  gerarId() {
    return Math.random().toString(36).substr(2, 9);
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
