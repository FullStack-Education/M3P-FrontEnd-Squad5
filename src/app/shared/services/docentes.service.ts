import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  

  constructor(private usuariosService: UsuariosService) { }

 
  getDocentesMatriculados(): Observable<UsuarioInterface[]> {
    return this.usuariosService.getUsuarios().pipe(
      map((usuarios: any[]) => usuarios.filter(usuario => usuario.perfil === 'Docente'))
    );
  }

  numeroDocentesMatriculados(): Observable<number> {
    return this.getDocentesMatriculados().pipe(
      map(docentes => docentes.length)
    );
  }
}