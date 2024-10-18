import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuLateralService {

  constructor() { }


  getPerfilUsuarioLogado(): string {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      return usuario.perfil;
    }
    return '';
  }
}
