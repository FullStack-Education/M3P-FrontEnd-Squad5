import { Injectable } from '@angular/core';
import { CursosInterface } from '../interfaces/cursos.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private API_URL = `${environment.apiUrl}materias`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getMaterias(): Observable<Array<CursosInterface>> {
    return this.httpClient.get<Array<CursosInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }
}
