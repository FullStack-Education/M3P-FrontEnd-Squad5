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

  // getUsuarios(): Observable<Array<UsuarioInterface>> {
  //   return this.http.get<Array<UsuarioInterface>>(this.urlUsuarios, {
  //     headers: this.authService.getHeaders(),
  //   });
  // }

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

  // postUsuario(usuario: UsuarioInterface): Observable<any> {
  //   return this.http.post<any>(this.urlUsuarios, usuario, {
  //     headers: this.authService.getHeaders(),
  //   });
  // }

  // putUsuario(usuario: UsuarioInterface): Observable<any> {
  //   return this.http.put<any>(
  //     `${this.urlUsuarios}/${usuario.id}`,
  //     usuario,
  //     { headers: this.authService.getHeaders() }
  //   );
  // }

  // deleteUsuario(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.urlUsuarios}/${id}`, {
  //     headers: this.authService.getHeaders(),
  //   });
  // }
}
