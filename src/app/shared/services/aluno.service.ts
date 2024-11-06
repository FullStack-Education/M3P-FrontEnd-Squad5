import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';
import { AlunoInterface } from '../interfaces/alunos.interface';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private API_URL = `${environment.apiUrl}alunos`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAlunosMatriculados(): Observable<AlunoInterface[]> {
    return this.httpClient.get<Array<AlunoInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }

  getAluno(id: string): Observable<AlunoInterface> {
    const urlCompleta = `${this.API_URL}/${id}`;
    return this.httpClient.get<AlunoInterface>(urlCompleta, {
      headers: this.authService.getHeaders(),
    });
  }

  postAluno(aluno: AlunoInterface): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, aluno, {
      headers: this.authService.getHeaders(),
    });
  }

  putAluno(aluno: AlunoInterface): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${aluno.id}`, aluno, {
      headers: this.authService.getHeaders(),
    });
  }

  deleteAluno(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {
      headers: this.authService.getHeaders(),
    });
  }

  numeroAlunosMatriculados(): Observable<number> {
    return this.getAlunosMatriculados().pipe(map((alunos) => alunos.length));
  }
}
