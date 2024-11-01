import { EventEmitter, Injectable, Output } from '@angular/core';
import { MenuLateralComponent } from '../components/menu-lateral/menu-lateral.component';

@Injectable({
  providedIn: 'root',
})
export class MenuLateralService {
  getPerfilUsuarioLogado(): string {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return '';

    const usuario = JSON.parse(usuarioLogado);
    return usuario.perfil;
  }
}
