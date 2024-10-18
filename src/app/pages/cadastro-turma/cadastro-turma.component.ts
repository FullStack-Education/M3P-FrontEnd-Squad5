import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { TurmaInterface } from '../../shared/interfaces/turma.interface';
import { TurmasService } from '../../shared/services/turmas.service';
import { ActivatedRoute } from '@angular/router';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';
import { DocentesService } from '../../shared/services/docentes.service';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';


@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-turma.component.html',
  styleUrl: './cadastro-turma.component.css'
})
export class CadastroTurmaComponent implements OnInit{

  turmaForm!: FormGroup;
  isEdit = false;
  idTurma: string | undefined;
  perfilLogado: string = '';
  docentes: any[] = [];
  

  constructor(private viaCepService: ViaCepService ,
    private turmaService: TurmasService,
    private activatedRoute: ActivatedRoute,
    private menuLateralService: MenuLateralService,
    private docentesService: DocentesService
   ) { }

   ngOnInit(): void {
    this.idTurma = this.activatedRoute.snapshot.params['id'];
    this.perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    


    if (this.idTurma) {
      this.isEdit = true;
      this.turmaService.getTurma(this.idTurma).subscribe((turma) => {
        if(turma){
        this.turmaForm.patchValue(turma);
        }
      });
    }

    this.turmaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      dataInicio: new FormControl('', Validators.required),
      dataTermino: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
      docente: new FormControl('', Validators.required),
    });


    if (this.perfilLogado === 'Docente') {
      const docenteNome = this.getNomeUsuarioLogado(); 
      this.docentes = [{nome: docenteNome}];
      this.turmaForm.controls['docente'].disable();
    } else if (this.perfilLogado === 'Administrador') {
      this.docentesService.getDocentesMatriculados().subscribe((docentes) => {
        this.docentes = docentes;
      } );
    }



  }

  salvarTurma() {
    if (this.turmaForm.valid) {

      if (this.perfilLogado === 'Docente') {
        this.turmaForm.controls['docente'].setValue(this.getNomeUsuarioLogado());
      }

      const novaTurma: TurmaInterface = {
        ...this.turmaForm.value,
        id:this.idTurma ? this.idTurma : this.gerarId(),
        professor: this.turmaForm.controls['docente'].value,
      };
      this.turmaService.postTurma(novaTurma).subscribe((retorno) => {
        window.alert('Turma criada com sucesso');
      });
    } else {
      window.alert('Cheque os campos obrigatórios');
    }
  }



  getNomeUsuarioLogado(): string {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    return usuarioLogado.nome || '';
  }
  
  getUsuarioLogado(): UsuarioInterface {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    return usuarioLogado || '';
  }

  gerarId() {
    return Math.random().toString(36).substr(2, 9);
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
