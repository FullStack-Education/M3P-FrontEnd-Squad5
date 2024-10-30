import { EventEmitter, Injectable, Output } from '@angular/core';
import { MenuLateralComponent } from '../components/menu-lateral/menu-lateral.component';

@Injectable({
  providedIn: 'root',
})
export class MenuLateralService {
  // private offcanvasComponent!: MenuLateralComponent;
  // registerOffcanvas(offcanvasComponent: MenuLateralComponent) {
  //   this.offcanvasComponent = offcanvasComponent;
  // }

  // constructor() {}

  // abreFechaMenu() {
  //   console.log('teste');
  //   if (this.offcanvasComponent) {
  //     this.offcanvasComponent.open();
  //   }
  // }
  getPerfilUsuarioLogado(): string {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      return usuario.perfil;
    }
    return '';
  }
}
