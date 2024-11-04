import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private urlAlunos = 'http://localhost:8080/alunos';

  constructor(private httpClient: HttpClient) {}

  // Helper to set JWT in request headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAlunosMatriculados(): Observable<UsuarioInterface[]> {
    return this.httpClient.get<UsuarioInterface[]>(this.urlAlunos, { headers: this.getHeaders() });
  }

  numeroAlunosMatriculados(): Observable<number> {
    return this.getAlunosMatriculados().pipe(
      map(alunos => alunos.length)
    );
  }
}