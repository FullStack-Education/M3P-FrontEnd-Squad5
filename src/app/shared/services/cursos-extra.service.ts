import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosInterface } from '../interfaces/cursos.interface';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CursosExtraService {
  private API_URL = `${environment.apiUrl}cursos`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCursosExtras(): Observable<Array<CursosInterface>> {
    return this.httpClient.get<Array<CursosInterface>>(this.API_URL, {
      headers: this.authService.getHeaders(),
    });
  }
}
