import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginaLoginService {

  

  private url = 'http://localhost:8080/usuarios';

  
  
  constructor(private httpClient: HttpClient) {}

  // Helper function to get headers with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
      
    });
  }


  login(usuario: { id: string, email: string, senha: string, perfil: string, nome: string }) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
  }

  getUsuario(id: string): Observable<UsuarioInterface> {
    return this.httpClient.get<UsuarioInterface>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }



  getPerfil(email: string): Observable<UsuarioInterface | null> {
    return this.httpClient.get<UsuarioInterface>(this.url) 
    .pipe(
      map(usuario => { 
        if (Array.isArray(usuario)) {
          return usuario.find(u => u.email === email);
        } else {
          return usuario.email === email ? usuario : null; 
        }
      }),
      catchError(() => of(null)) 
    );
}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('usuarioLogado') !== null;
  }
}
