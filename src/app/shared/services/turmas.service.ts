import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TurmaInterface } from '../interfaces/turma.interface';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  
  private url = 'http://localhost:3000/turmas';

  constructor(private httpClient: HttpClient) {}

   getTurma(id: string) {
    return this.httpClient.get<TurmaInterface>(this.url + `/${id}`);
  }

  postTurma(turma: TurmaInterface) {
    return this.httpClient.post<any>(this.url, turma);
  }

  getTurmas(): Observable<Array<TurmaInterface>> {
    return this.httpClient.get<Array<TurmaInterface>>(this.url);
  }

  numeroTurmasCadastradas(): Observable<number> {
    return this.getTurmas().pipe(
      map(turmas => turmas.length)
    );
  }

  getTurmasByDocente(docenteId: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}`, {
      params: { professor: docenteId }
    });
  }

  getTurmasByDocenteName(docenteName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}?professor=${docenteName}`);
  }

  getTurmasByAlunoName(alunoName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}?aluno=${alunoName}`);
  }
  
}
