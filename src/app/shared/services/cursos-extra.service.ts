import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosInterface } from '../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosExtraService {

  private url = 'http://localhost:8080/cursos';

  constructor(private httpClient: HttpClient) {}

  // Helper method to include JWT token in headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCursosExtras(): Observable<Array<CursosInterface>> {
    return this.httpClient.get<Array<CursosInterface>>(this.url, { headers: this.getHeaders() });
  }
}