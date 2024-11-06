import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocenteInterface } from '../interfaces/docentes.interface';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {
  private API_URL = `${environment.apiUrl}docentes`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getDocentesMatriculados(): Observable<DocenteInterface[]> {
    return this.httpClient.get<Array<DocenteInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }

  getDocente(id: string): Observable<DocenteInterface> {
    const urlCompleta = `${this.API_URL}/${id}`;
    return this.httpClient.get<DocenteInterface>(urlCompleta, {
      headers: this.authService.getHeaders(),
    });
  }

  postDocente(docente: DocenteInterface): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, docente, {
      headers: this.authService.getHeaders(),
    });
  }

  putDocente(docente: DocenteInterface): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/${docente.id}`, docente, {
      headers: this.authService.getHeaders(),
    });
  }

  deleteDocente(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`, {
      headers: this.authService.getHeaders(),
    });
  }

  numeroDocentesMatriculados(): Observable<number> {
    return this.getDocentesMatriculados().pipe(
      map((docentes) => docentes.length)
    );
  }
}
