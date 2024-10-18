import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';
import { TurmasService } from '../../shared/services/turmas.service';
import { NotasService } from '../../shared/services/notas.service';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.css'
})
export class CadastroDocenteComponent implements OnInit {

  docenteForm!: FormGroup;

  isEdit = false;
  idUsuario: string | undefined;
  nomeUsuario: string | undefined;

  generos = ['', 'Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['', 'Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  materias = ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Biologia'];



  constructor(private viaCepService: ViaCepService,
    private usuarioService: UsuariosService,
    private turmasService: TurmasService,
    private notasService: NotasService,
    private activatedRoute: ActivatedRoute,
    private menuLateralService: MenuLateralService
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.isEdit = true;
      this.usuarioService.getUsuario(this.idUsuario).subscribe((usuario) => {
        if (usuario) {
          this.docenteForm.patchValue({
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
            materias: usuario.materias || []
          });
        }
      });
    }

    this.docenteForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      naturalidade: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      pontoReferencia: new FormControl(''),
      materias: new FormControl([], Validators.required)
    });
  }



  buscarCep() {
    const cep = this.docenteForm.get('cep')?.value;
    if (cep) {
      this.viaCepService.buscarCep(cep).subscribe(dados => {
        if (dados) {
          this.docenteForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          });
        }
      });
    }
  }

  salvarDocente() {
    if (this.docenteForm.valid) {
      const novoDocente: UsuarioInterface = {
        ...this.docenteForm.value,
        perfil: 'Docente',
        idade: this.calcularIdade(new Date(this.docenteForm.value.dataNascimento)),
        id: this.idUsuario ? this.idUsuario : this.gerarId()
      };
      this.usuarioService.postUsuario(novoDocente).subscribe((retorno) => {
        window.alert('Usuário criado com sucesso');
      });
    } else {
      window.alert('Cheque os campos obrigatórios');
    }
  }

  editarDocente(): void {
    if (this.isEdit && this.docenteForm.valid) {
      const docenteEditado: UsuarioInterface = {
        ...this.docenteForm.value,
        perfil: 'Docente',
        id: this.idUsuario,
        idade: this.calcularIdade(new Date(this.docenteForm.value.dataNascimento)),
      };
      this.usuarioService.putUsuario(docenteEditado).subscribe(() => {
        window.alert('Docente editado com sucesso');
      });
    } else {
      window.alert('Cheque os campos obrigatórios');
    }
  }

  deletarDocente(): void {
    if (this.isEdit && this.idUsuario) {

      const idDocente = this.idUsuario;

      const nomeDocente = this.docenteForm.get('nome')?.value;
      console.log(nomeDocente);
      this.turmasService.getTurmasByDocenteName(nomeDocente).subscribe(turmas => {
        if (turmas.length > 0) {
          console.log(turmas);
          window.alert('O docente não pode ser deletado porque possui turmas vinculadas.');
          return; 
        }

        // Se não há turmas vinculadas, verifique as avaliações
        this.notasService.getNotasByDocenteName(nomeDocente).subscribe(avaliacoes => {
          if (avaliacoes.length > 0) {
            console.log(avaliacoes);
            window.alert('O docente não pode ser deletado porque possui avaliações vinculadas.');
            return; 
          }

          // Se não há turmas ou avaliações vinculadas, deletar o docente
          this.usuarioService.deleteUsuario(idDocente).subscribe(() => {
            window.alert('Docente deletado com sucesso.');
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
    let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Administrador';
  }

  get isDocente(): boolean {
    let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Docente';
  }

  get isAluno(): boolean {
    let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
    return perfilLogado === 'Aluno';
  }

}

