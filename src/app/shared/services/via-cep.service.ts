import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private httpClient: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    return this.httpClient.get(`${this.viaCepUrl}/${cep}/json`);
  }
}
