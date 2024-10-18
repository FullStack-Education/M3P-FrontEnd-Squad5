import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {}

  getUsuarios() {
    return this.httpClient.get<Array<UsuarioInterface>>(this.url);
  }

  getUsuario(id: string): Observable<UsuarioInterface> {
    const urlCompleta = `${this.url}/${id}`; // Constrói a URL completa para a requisição
    return this.httpClient.get<UsuarioInterface>(urlCompleta); // Faz a requisição GET e retorna um Observable
  }

  postUsuario(usuario: UsuarioInterface) {
    return this.httpClient.post<any>(this.url, usuario);
  }

  putUsuario(usuario: UsuarioInterface) {
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }

  deleteUsuario(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
