import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private API_URL = `${environment.apiUrl}usuarios`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsuario(id: string): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(`${this.API_URL}/${id}`, {
      headers: this.authService.getHeaders(),
    });
  }

  getAuthUsuario(): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(`${this.API_URL}/token`, {
      headers: this.authService.getHeaders(),
    });
  }
}
