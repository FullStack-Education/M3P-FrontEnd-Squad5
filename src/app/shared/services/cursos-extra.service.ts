import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosInterface } from '../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosExtraService {

  private url = 'http://localhost:3000/cursosExtras';

  constructor(private httpClient: HttpClient) {}

  getCursosExtras(){
    return this.httpClient.get<Array<CursosInterface>>(this.url);
  }
}
