import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TurmaInterface } from '../interfaces/turma.interface';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TurmasService {
  private API_URL = `${environment.apiUrl}turmas`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getTurma(id: string): Observable<TurmaInterface> {
    return this.httpClient.get<TurmaInterface>(`${this.API_URL}/${id}`, {
      headers: this.authService.getHeaders(),
    });
  }

  postTurma(turma: TurmaInterface): Observable<TurmaInterface> {
    return this.httpClient.post<TurmaInterface>(this.API_URL, turma, {
      headers: this.authService.getHeaders(),
    });
  }

  getTurmas(): Observable<Array<TurmaInterface>> {
    return this.httpClient.get<Array<TurmaInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }

  numeroTurmasCadastradas(): Observable<number> {
    console.log('Passou');
    return this.getTurmas().pipe(map((turmas) => turmas.length));
  }

  getTurmasByDocente(docenteId: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.API_URL}`, {
      headers: this.authService.getHeaders(),
      params: { professor: docenteId },
    });
  }

  getTurmasByDocenteName(docenteName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.API_URL}`, {
      headers: this.authService.getHeaders(),
      params: { professor: docenteName },
    });
  }

  getTurmasByAlunoName(alunoName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.API_URL}`, {
      headers: this.authService.getHeaders(),
      params: { aluno: alunoName },
    });
  }
}
