import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginaLoginService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/usuarios';

  login(usuario: { id: string, email: string, senha: string, perfil: string, nome: string }) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
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
