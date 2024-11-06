import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaginaLoginService {
  private API_URL = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  login(usuario: UsuarioInterface) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('usuarioLogado') !== null;
  }
}
