import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocenteInterface } from '../interfaces/docentes.interface';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  private apiUrl = 'http://localhost:8080/docentes';
  
  constructor(private usuariosService: UsuariosService,
              private httpClient: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    console.log(token);
    return new HttpHeaders({'Authorization': `Bearer ${token}`});
  }


  getDocentesMatriculados(): Observable<DocenteInterface[]> {
    return this.httpClient.get<Array<DocenteInterface>>(this.apiUrl, {headers: this.getHeaders()});
  }

  getDocente(id: string): Observable<DocenteInterface> {
    const urlCompleta = `${this.apiUrl}/${id}`;
    return this.httpClient.get<DocenteInterface>(urlCompleta, {headers: this.getHeaders()});
  }

  postDocente(docente: DocenteInterface): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, docente,  {headers: this.getHeaders()});
  }

  putDocente(docente: DocenteInterface): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${docente.id}`, docente, {headers: this.getHeaders()});
  }

  deleteDocente(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }

  numeroDocentesMatriculados(): Observable<number> {
    return this.getDocentesMatriculados().pipe(
      map(docentes => docentes.length)
    );
  }
}