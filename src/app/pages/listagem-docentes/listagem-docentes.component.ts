import { Component, OnInit } from '@angular/core';
import { CardDocenteComponent } from '../../shared/components/card-docente/card-docente.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocentesService } from '../../shared/services/docentes.service';
import { AuthService } from 'app/shared/services/auth.service';
import { DocenteInterface } from 'app/shared/interfaces/docentes.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [CardDocenteComponent, CommonModule, FormsModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss',
})
export class ListagemDocentesComponent implements OnInit {
  docentes: Observable<DocenteInterface[]>;
  valorBusca: string = '';
  docentesEncontrados: Observable<DocenteInterface[]>;

  constructor(
    private authService: AuthService,
    private docenteService: DocentesService
  ) {}

  ngOnInit(): void {
    this.carregarDocentes();
  }

  carregarDocentes(): void {
    this.docentes = this.docenteService.getDocentesMatriculados();
  }

  buscaDocente() {
    if (!this.valorBusca) this.docentesEncontrados = this.docentes;

    let filterWords = this.valorBusca.toLocaleLowerCase();
    this.docentesEncontrados = this.docentes.pipe(
      map((docentes) =>
        docentes.filter(
          (docente) =>
            docente.id === filterWords ||
            docente.nome.toLowerCase().includes(filterWords) ||
            docente.email.toLowerCase().includes(filterWords)
        )
      )
    );
  }

  selecionaPrimeiroDocente() {
    //this.valorBusca = this.docentesEncontrados;
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
