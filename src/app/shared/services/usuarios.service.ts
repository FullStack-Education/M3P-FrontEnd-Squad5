// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { UsuarioInterface } from '../interfaces/usuario.interface';
// import { Observable } from 'rxjs';

// interface LoginResponse {
//   valorJWT: string;
//   tempoExpiracao: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuariosService {

//   private apiUrl = 'http://localhost:8080'; // Update this with your backend URL

//   private urlUsuarios = `http://localhost:3000/Usuarios`;
//   private urlLogin = `${this.apiUrl}/login`; // Endpoint for JWT login

//   constructor(private httpClient: HttpClient) {}

//   // Existing method to get a list of users
//   getUsuarios(): Observable<Array<UsuarioInterface>> {
//     return this.httpClient.get<Array<UsuarioInterface>>(this.urlUsuarios);
//   }

//   // Existing method to get a single user by ID
//   getUsuario(id: string): Observable<UsuarioInterface> {
//     const urlCompleta = `${this.urlUsuarios}/${id}`;
//     return this.httpClient.get<UsuarioInterface>(urlCompleta);
//   }

//   // Existing method to create a new user
//   postUsuario(usuario: UsuarioInterface): Observable<any> {
//     return this.httpClient.post<any>(this.urlUsuarios, usuario);
//   }

//   // Existing method to update a user
//   putUsuario(usuario: UsuarioInterface): Observable<any> {
//     return this.httpClient.put<any>(`${this.urlUsuarios}/${usuario.id}`, usuario);
//   }

//   // Existing method to delete a user
//   deleteUsuario(id: string): Observable<any> {
//     return this.httpClient.delete<any>(`${this.urlUsuarios}/${id}`);
//   }

//   // New method to authenticate user and retrieve JWT valorJWT
//   login(email: string, senha: string): Observable<{ valorJWT: string }> {
//     // Send login credentials to the backend login endpoint
//     return this.httpClient.post<{ valorJWT: string }>(this.urlLogin, { login: email, senha });
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private apiUrl = 'http://localhost:8080'; // Base URL for backend

  private urlUsuarios = `${this.apiUrl}/usuarios`; // Endpoint to fetch users
  private urlLogin = `${this.apiUrl}/login`; // Endpoint for JWT login

  constructor(private httpClient: HttpClient) {}

  // Helper to include JWT in the headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to get a list of all users
  getUsuarios(): Observable<Array<UsuarioInterface>> {
    return this.httpClient.get<Array<UsuarioInterface>>(this.urlUsuarios, { headers: this.getHeaders() });
  }

  // Method to get a single user by ID
  getUsuario(email: string): Observable<UsuarioInterface> {
    const urlCompleta = `${this.urlUsuarios}/${email}`; // Construct full URL
    return this.httpClient.get<UsuarioInterface>(urlCompleta, { headers: this.getHeaders() });
  }

  // Method to create a new user
  postUsuario(usuario: UsuarioInterface): Observable<any> {
    return this.httpClient.post<any>(this.urlUsuarios, usuario, { headers: this.getHeaders() });
  }

  // Method to update a user by ID
  putUsuario(usuario: UsuarioInterface): Observable<any> {
    return this.httpClient.put<any>(`${this.urlUsuarios}/${usuario.id}`, usuario, { headers: this.getHeaders() });
  }

  // Method to delete a user by ID
  deleteUsuario(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlUsuarios}/${id}`, { headers: this.getHeaders() });
  }

  // Method to authenticate user and retrieve JWT
  login(email: string, senha: string): Observable<{ valorJWT: string }> {
    // Send login credentials to backend login endpoint
    return this.httpClient.post<{ valorJWT: string }>(this.urlLogin, { login: email, senha });
  }
}

