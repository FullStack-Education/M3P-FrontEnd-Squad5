import { Injectable } from '@angular/core';
import { CursosInterface } from '../interfaces/cursos.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private url = 'http://localhost:3000/materias';

  constructor(private httpClient: HttpClient) {}

  getMaterias(){
    return this.httpClient.get<Array<CursosInterface>>(this.url);
  }
}
