import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'http://localhost:8080/alunos';

  constructor(private usuariosService: UsuariosService,
              private httpClient: HttpClient 
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    console.log(token);
    return new HttpHeaders({'Authorization': `Bearer ${token}`});
  }


  getAlunosMatriculados(): Observable<UsuarioInterface[]> {
    return this.httpClient.get<Array<UsuarioInterface>>(this.apiUrl, {headers: this.getHeaders()});
  }

  getAluno(id: string): Observable<UsuarioInterface> {
    const urlCompleta = `${this.apiUrl}/${id}`;
    return this.httpClient.get<UsuarioInterface>(urlCompleta, {headers: this.getHeaders()});
  }


  numeroAlunosMatriculados(): Observable<number> {
    return this.getAlunosMatriculados().pipe(
      map(alunos => alunos.length)
    );
  }


}
  
