import { Injectable } from '@angular/core';
import { NotaInterface } from '../interfaces/nota.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private API_URL = `${environment.apiUrl}notas`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getNotas(): Observable<Array<NotaInterface>> {
    return this.httpClient.get<Array<NotaInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }

  getNota(id: string): Observable<NotaInterface> {
    return this.httpClient.get<NotaInterface>(`${this.API_URL}/${id}`, {
      headers: this.authService.getHeaders(),
    });
  }

  getNotasByAluno(alunoId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(
      `${this.API_URL}?alunoId=${alunoId}`,
      { headers: this.authService.getHeaders() }
    );
  }

  getNotasByDocente(docenteId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(
      `${this.API_URL}?docenteId=${docenteId}`,
      { headers: this.authService.getHeaders() }
    );
  }

  getNotasByAlunoName(alunoName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(
      `${this.API_URL}?aluno=${alunoName}`,
      { headers: this.authService.getHeaders() }
    );
  }

  getNotasByDocenteName(docenteName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(
      `${this.API_URL}?docente=${docenteName}`,
      { headers: this.authService.getHeaders() }
    );
  }

  postNota(nota: NotaInterface): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, nota, {
      headers: this.authService.getHeaders(),
    });
  }
}
