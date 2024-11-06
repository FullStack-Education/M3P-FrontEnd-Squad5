import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { TurmasService } from '../../shared/services/turmas.service';
import { NotasService } from '../../shared/services/notas.service';
import { ToastService } from 'app/shared/services/toast.service';
import { ToastType } from 'app/shared/enums/toast-type.enum';
import { AlunoService } from 'app/shared/services/aluno.service';
import { AlunoInterface } from 'app/shared/interfaces/alunos.interface';
import { AuthService } from 'app/shared/services/auth.service';
import { Profile } from 'app/shared/enums/profile.enum';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  turmas: any[] = [];
  isEdit = false;
  idAluno: string | undefined;

  generos = ['Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private turmasService: TurmasService,
    private notasService: NotasService,
    private authService: AuthService,
    private toastService: ToastService,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.idAluno = this.activatedRoute.snapshot.params['id'];

    if (this.idAluno) {
      this.isEdit = true;
      this.alunoService.getAluno(this.idAluno).subscribe((usuario) => {
        if (usuario) {
          this.alunoForm.patchValue({
            nome: usuario.nome || '',
            genero: usuario.genero || '',
            dataNascimento: usuario.dataNascimento || '',
            cpf: usuario.cpf || '',
            rg: usuario.rg || '',
            estadoCivil: usuario.estadoCivil || '',
            telefone: usuario.telefone || '',
            email: usuario.email || '',
            senha: usuario.senha || '',
            naturalidade: usuario.naturalidade || '',
            cep: usuario.cep || '',
            cidade: usuario.cidade || '',
            estado: usuario.estado || '',
            logradouro: usuario.logradouro || '',
            numero: usuario.numero || '',
            complemento: usuario.complemento || '',
            bairro: usuario.bairro || '',
            pontoReferencia: usuario.pontoReferencia || '',
            turma: usuario.turma || [],
          });
        }
      });
    }

    this.alunoForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      genero: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      rg: ['', [Validators.required, Validators.maxLength(20)]],
      estadoCivil: ['', Validators.required],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      naturalidade: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      pontoReferencia: [''],
      turmas: [[], Validators.required],
    });

    this.turmasService.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
  }

  buscarCep() {
    const cep = this.alunoForm.get('cep')?.value;
    if (cep) {
      this.viaCepService.buscarCep(cep).subscribe((dados) => {
        if (dados) {
          this.alunoForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
          });
        }
      });
    }
  }

  salvarAluno() {
    if (this.alunoForm.valid) {
      const novoAluno: AlunoInterface = {
        ...this.alunoForm.value,
        perfil: Profile.ALUNO,
        idade: this.calcularIdade(
          new Date(this.alunoForm.value.dataNascimento)
        ),
        id: this.idAluno ? this.idAluno : this.gerarId(),
        turma: parseInt(this.alunoForm.value.turmas[0]),
      };
      console.log('turmas');
      console.log(novoAluno.turma);
      this.alunoService.postAluno(novoAluno).subscribe((retorno) => {
        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Aluno criado com sucesso!'
        );
      });
    } else {
      this.toastService.showToast(
        ToastType.ERROR,
        'Erro',
        'Cheque os campos obrigatórios!'
      );
    }
  }

  editarAluno(): void {
    if (this.isEdit && this.alunoForm.valid) {
      const alunoEditado: AlunoInterface = {
        ...this.alunoForm.value,
        perfil: Profile.ALUNO,
        id: this.idAluno,
        idade: this.calcularIdade(
          new Date(this.alunoForm.value.dataNascimento)
        ),
        turma: parseInt(this.alunoForm.value.turmas[0]),
      };
      this.alunoService.putAluno(alunoEditado).subscribe(() => {
        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Aluno editado com sucesso!'
        );
      });
    } else {
      this.toastService.showToast(
        ToastType.ERROR,
        'Erro',
        'Cheque os campos obrigatórios!'
      );
    }
  }

  deletarAluno(): void {
    if (this.isEdit && this.idAluno) {
      const idAluno = parseInt(this.idAluno);

      const nomeAluno = this.alunoForm.get('nome')?.value;
      //  verifique as avaliações
      this.notasService
        .getNotasByAlunoName(nomeAluno)
        .subscribe((avaliacoes) => {
          if (avaliacoes.length > 0) {
            this.toastService.showToast(
              ToastType.WARNING,
              'Atenção!',
              'O aluno não pode ser deletado porque possui avaliações vinculadas'
            );
            return;
          }

          // Se não há avaliações vinculadas, deletar o aluno
          this.alunoService.deleteAluno(idAluno).subscribe(() => {
            this.toastService.showToast(
              ToastType.SUCCESS,
              'Sucesso!',
              'Aluno deletado com sucesso!'
            );
          });
        });
    }
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
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
