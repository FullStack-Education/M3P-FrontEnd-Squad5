import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
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
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  turmas: any[] = [];
  isEdit = false;
  idUsuario: string | undefined;

  generos = ['', 'Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['', 'Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];

  constructor(
    private viaCepService: ViaCepService,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private turmasService: TurmasService,
    private notasService: NotasService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.isEdit = true;
      this.usuarioService.getUsuario(this.idUsuario).subscribe((usuario) => {
        if (usuario) {
          this.alunoForm.patchValue({
            nome: usuario.nome || '',
          });
        }
      });
    }

    this.alunoForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/),
      ]),
      email: new FormControl('', [Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      pontoReferencia: new FormControl(''),
      turmas: new FormControl([], Validators.required),
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
      const novoAluno: UsuarioInterface = {
        ...this.alunoForm.value,
        perfil: 'Aluno',
        idade: this.calcularIdade(
          new Date(this.alunoForm.value.dataNascimento)
        ),
        id: this.idUsuario ? this.idUsuario : this.gerarId(),
      };
      // this.usuarioService.postUsuario(novoAluno).subscribe((retorno) => {
      //   this.toastService.showToast(
      //     ToastType.SUCCESS,
      //     'Sucesso!',
      //     'Usuário criado com sucesso!'
      //   );
      // });
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
      const alunoEditado: UsuarioInterface = {
        ...this.alunoForm.value,
        perfil: 'Aluno',
        id: this.idUsuario,
        idade: this.calcularIdade(
          new Date(this.alunoForm.value.dataNascimento)
        ),
      };
      // this.usuarioService.putUsuario(alunoEditado).subscribe(() => {
      //   this.toastService.showToast(
      //     ToastType.SUCCESS,
      //     'Sucesso!',
      //     'Aluno editado com sucesso!'
      //   );
      // });
    } else {
      this.toastService.showToast(
        ToastType.ERROR,
        'Erro',
        'Cheque os campos obrigatórios!'
      );
    }
  }

  deletarAluno(): void {
    if (this.isEdit && this.idUsuario) {
      const idAluno = this.idUsuario;

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
          // this.usuarioService.deleteUsuario(idAluno).subscribe(() => {
          //   this.toastService.showToast(
          //     ToastType.SUCCESS,
          //     'Sucesso!',
          //     'Aluno deletado com sucesso!'
          //   );
          // });
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
