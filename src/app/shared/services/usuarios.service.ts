import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

interface LoginResponse {
  valorJWT: string;
  tempoExpiracao: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:8080'; // Update this with your backend URL

  private urlUsuarios = `${this.apiUrl}/usuarios`;
  private urlLogin = `${this.apiUrl}/login`; // Endpoint for JWT login

  constructor(private httpClient: HttpClient) {}

  // Existing method to get a list of users
  getUsuarios(): Observable<Array<UsuarioInterface>> {
    return this.httpClient.get<Array<UsuarioInterface>>(this.urlUsuarios);
  }

  // Existing method to get a single user by ID
  getUsuario(id: string): Observable<UsuarioInterface> {
    const urlCompleta = `${this.urlUsuarios}/${id}`;
    return this.httpClient.get<UsuarioInterface>(urlCompleta);
  }

  // Existing method to create a new user
  postUsuario(usuario: UsuarioInterface): Observable<any> {
    return this.httpClient.post<any>(this.urlUsuarios, usuario);
  }

  // Existing method to update a user
  putUsuario(usuario: UsuarioInterface): Observable<any> {
    return this.httpClient.put<any>(`${this.urlUsuarios}/${usuario.id}`, usuario);
  }

  // Existing method to delete a user
  deleteUsuario(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlUsuarios}/${id}`);
  }

  // New method to authenticate user and retrieve JWT valorJWT
  login(email: string, senha: string): Observable<{ valorJWT: string }> {
    // Send login credentials to the backend login endpoint
    return this.httpClient.post<{ valorJWT: string }>(this.urlLogin, { login: email, senha });
  }
}
