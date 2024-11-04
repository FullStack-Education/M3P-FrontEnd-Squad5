import { Injectable } from '@angular/core';
import { NotaInterface } from '../interfaces/nota.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private url = 'http://localhost:8080/notas';

  constructor(private httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getNotas(): Observable<Array<NotaInterface>> {
    return this.httpClient.get<Array<NotaInterface>>(this.url, { headers: this.getHeaders() });
  }

  getNota(id: string): Observable<NotaInterface> {
    return this.httpClient.get<NotaInterface>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  getNotasByAluno(alunoId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?alunoId=${alunoId}`, { headers: this.getHeaders() });
  }

  getNotasByDocente(docenteId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?docenteId=${docenteId}`, { headers: this.getHeaders() });
  }

  getNotasByAlunoName(alunoName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?aluno=${alunoName}`, { headers: this.getHeaders() });
  }

  getNotasByDocenteName(docenteName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?docente=${docenteName}`, { headers: this.getHeaders() });
  }

  postNota(nota: NotaInterface): Observable<any> {
    return this.httpClient.post<any>(this.url, nota, { headers: this.getHeaders() });
  }
}