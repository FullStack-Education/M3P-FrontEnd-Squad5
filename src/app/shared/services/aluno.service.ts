import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { UsuariosService } from './usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

 
  constructor(private usuariosService: UsuariosService) { }



  getAlunosMatriculados(): Observable<UsuarioInterface[]> {
    return this.usuariosService.getUsuarios().pipe(
      map((usuarios: any[]) => usuarios.filter(usuario => usuario.perfil === 'Aluno'))
    );
  }

  numeroAlunosMatriculados(): Observable<number> {
    return this.getAlunosMatriculados().pipe(
      map(alunos => alunos.length)
    );
  }


}
  
