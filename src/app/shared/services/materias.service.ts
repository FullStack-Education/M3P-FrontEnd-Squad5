import { Injectable } from '@angular/core';
import { CursosInterface } from '../interfaces/cursos.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private url = 'http://localhost:8080/materias';

  constructor(private httpClient: HttpClient) {}

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMaterias(): Observable<Array<CursosInterface>> {
    return this.httpClient.get<Array<CursosInterface>>(this.url, { headers: this.getHeaders() });
  }
}