import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { TokenResponse } from '../interfaces/tokenresponse.interface';
import { Profile } from '../enums/profile.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.apiUrl}`;
  private perfilLogado: Profile;
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {
    this.perfilLogado = this.getPerfilUsuarioLogado();
  }

  login = (email: string, password: string): Observable<TokenResponse> =>
    this.http
      .post<TokenResponse>(`${this.API_URL}login`, {
        login: email,
        senha: password,
      })
      .pipe(
        tap((response) => {
          this.setToken(response.valorJWT);
        })
      );

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken = (): string | null => localStorage.getItem(this.tokenKey);

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated = (): boolean => !!this.getToken();

  getHeaders = (): HttpHeaders =>
    new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });

  get isAdmin(): boolean {
    return this.perfilLogado === Profile.ADMIN;
  }

  get isDocente(): boolean {
    return (
      this.perfilLogado !== Profile.ADMIN && this.perfilLogado !== Profile.ALUNO
    );
  }

  get isAluno(): boolean {
    return this.perfilLogado === Profile.ALUNO;
  }

  private getPerfilUsuarioLogado(): Profile {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return Profile.ALUNO;

    const usuario = JSON.parse(usuarioLogado);
    return usuario.papel;
  }
}
