import { Component, OnInit } from '@angular/core';
import { CardDocenteComponent } from '../../shared/components/card-docente/card-docente.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocentesService } from '../../shared/services/docentes.service';
import { AuthService } from 'app/shared/services/auth.service';
import { DocenteInterface } from 'app/shared/interfaces/docentes.interface';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [CardDocenteComponent, CommonModule, FormsModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss',
})
export class ListagemDocentesComponent implements OnInit {
  docentes: DocenteInterface[] = [];
  valorBusca: string = '';
  docentesEncontrados: DocenteInterface[] = [];

  constructor(
    private authService: AuthService,
    private docenteService: DocentesService
  ) {}

  ngOnInit(): void {
    this.carregarDocentes();
  }

  carregarDocentes(): void {
    this.docenteService.getDocentesMatriculados().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }

  buscaDocente() {
    if (this.valorBusca) {
      this.docentesEncontrados = this.docentes.filter(
        (docente) =>
          docente.nome.toLowerCase().includes(this.valorBusca.toLowerCase()) ||
          docente.id.toLowerCase().includes(this.valorBusca.toLowerCase())
      );
    } else {
      this.docentesEncontrados = this.docentes;
    }
  }

  selecionaPrimeiroDocente() {
    this.valorBusca = this.docentesEncontrados[0].nome;
    this.buscaDocente();
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
