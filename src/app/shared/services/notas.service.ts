import { Injectable } from '@angular/core';
import { NotaInterface } from '../interfaces/nota.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private url = 'http://localhost:3000/notas';

  constructor(private httpClient: HttpClient) {}

  getNotas(){
    return this.httpClient.get<Array<NotaInterface>>(this.url);
  }

  getNota(id: string) {
    return this.httpClient.get<NotaInterface>(this.url + `/${id}`);
  }

  getNotasByAluno(alunoId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?alunoId=${alunoId}`);
  }

  getNotasByDocente(docenteId: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?docenteId=${docenteId}`);
  }

  getNotasByAlunoName(alunoName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?aluno=${alunoName}`);
  }

  getNotasByDocenteName(docenteName: string): Observable<NotaInterface[]> {
    return this.httpClient.get<NotaInterface[]>(`${this.url}?docente=${docenteName}`);
  }

  postNota(nota: NotaInterface) {
    return this.httpClient.post<any>(this.url, nota);
  }


}
