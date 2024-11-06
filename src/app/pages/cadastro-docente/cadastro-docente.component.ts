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
import { DocentesService } from 'app/shared/services/docentes.service';
import { DocenteInterface } from 'app/shared/interfaces/docentes.interface';
import { AuthService } from 'app/shared/services/auth.service';
import { Profile } from 'app/shared/enums/profile.enum';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss',
})
export class CadastroDocenteComponent implements OnInit {
  docenteForm!: FormGroup;

  isEdit = false;
  idDocente: string | undefined;
  nomeUsuario: string | undefined;

  generos = ['', 'Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['', 'Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  materias = [
    'Matemática',
    'Física',
    'Química',
    'História',
    'Geografia',
    'Biologia',
  ];

  constructor(
    private viaCepService: ViaCepService,
    private docenteService: DocentesService,
    private turmasService: TurmasService,
    private notasService: NotasService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.idDocente = this.activatedRoute.snapshot.params['id'];

    if (this.idDocente) {
      this.isEdit = true;
      this.docenteService.getDocente(this.idDocente).subscribe((usuario) => {
        if (usuario) {
          this.docenteForm.patchValue({
            nome: usuario.nome || '',
          });
        }
      });
    }

    this.docenteForm = new FormGroup({
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
        Validators.pattern(
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
        ),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
      materias: new FormControl([], Validators.required),
    });
  }

  buscarCep() {
    const cep = this.docenteForm.get('cep')?.value;
    if (cep) {
      this.viaCepService.buscarCep(cep).subscribe((dados) => {
        if (dados) {
          this.docenteForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
          });
        }
      });
    }
  }

  salvarDocente() {
    if (this.docenteForm.valid) {
      const novoDocente: DocenteInterface = {
        ...this.docenteForm.value,
        perfil: Profile.PROFESSOR,
        idade: this.calcularIdade(
          new Date(this.docenteForm.value.dataNascimento)
        ),
        id: this.idDocente ? this.idDocente : this.gerarId(),
        materias: parseInt(this.docenteForm.value.materias[0]),
      };
      this.docenteService.postDocente(novoDocente).subscribe((retorno) => {
        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Usuário criado com sucesso'
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

  editarDocente(): void {
    if (this.isEdit && this.docenteForm.valid) {
      const docenteEditado: DocenteInterface = {
        ...this.docenteForm.value,
        perfil: Profile.PROFESSOR,
        id: this.idDocente,
        idade: this.calcularIdade(
          new Date(this.docenteForm.value.dataNascimento)
        ),
        materias: parseInt(this.docenteForm.value.materias[0]),
      };
      this.docenteService.putDocente(docenteEditado).subscribe(() => {
        this.toastService.showToast(
          ToastType.SUCCESS,
          'Sucesso!',
          'Docente editado com sucesso'
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

  deletarDocente(): void {
    if (this.isEdit && this.idDocente) {
      const idDocente = parseInt(this.idDocente);

      const nomeDocente = this.docenteForm.get('nome')?.value;
      this.turmasService
        .getTurmasByDocenteName(nomeDocente)
        .subscribe((turmas) => {
          if (turmas.length > 0) {
            this.toastService.showToast(
              ToastType.WARNING,
              'Atenção!',
              'O docente não pode ser deletado porque possui turmas vinculadas.'
            );
            return;
          }

          // Se não há turmas vinculadas, verifique as avaliações
          this.notasService
            .getNotasByDocenteName(nomeDocente)
            .subscribe((avaliacoes) => {
              if (avaliacoes.length > 0) {
                this.toastService.showToast(
                  ToastType.WARNING,
                  'Atenção!',
                  'O docente não pode ser deletado porque possui avaliações vinculadas.'
                );
                return;
              }

              // Se não há turmas ou avaliações vinculadas, deletar o docente
              this.docenteService.deleteDocente(idDocente).subscribe(() => {
                this.toastService.showToast(
                  ToastType.SUCCESS,
                  'Sucesso!',
                  'Docente deletado com sucesso'
                );
              });
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
