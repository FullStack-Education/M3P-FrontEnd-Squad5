import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TurmaInterface } from '../interfaces/turma.interface';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  
  private url = 'http://localhost:8080/turmas';

  constructor(private httpClient: HttpClient) {}

  // Helper function to get headers with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
      
    });
  }

  getTurma(id: string): Observable<TurmaInterface> {
    return this.httpClient.get<TurmaInterface>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  postTurma(turma: TurmaInterface): Observable<TurmaInterface> {
    console.log('TurmamInterface', turma);
    return this.httpClient.post<TurmaInterface>(this.url, turma, { headers: this.getHeaders() });
  }

  getTurmas(): Observable<Array<TurmaInterface>> {
    return this.httpClient.get<Array<TurmaInterface>>(this.url, { headers: this.getHeaders() });
  }

  numeroTurmasCadastradas(): Observable<number> {
    console.log("Passou");
    return this.getTurmas().pipe(
      map(turmas => turmas.length)
    );
  }

  getTurmasByDocente(docenteId: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}`, {
      headers: this.getHeaders(),
      params: { professor: docenteId }
    });
  }

  getTurmasByDocenteName(docenteName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}`, {
      headers: this.getHeaders(),
      params: { professor: docenteName }
    });
  }

  getTurmasByAlunoName(alunoName: string): Observable<TurmaInterface[]> {
    return this.httpClient.get<TurmaInterface[]>(`${this.url}`, {
      headers: this.getHeaders(),
      params: { aluno: alunoName }
    });
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { TurmaInterface } from '../interfaces/turma.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class TurmasService {
  
//   private url = 'http://localhost:8080/turmas';

//   constructor(private httpClient: HttpClient) {}

//    getTurma(id: string) {
//     return this.httpClient.get<TurmaInterface>(this.url + `/${id}`);
//   }

//   postTurma(turma: TurmaInterface) {
//     return this.httpClient.post<any>(this.url, turma);
//   }

//   getTurmas(): Observable<Array<TurmaInterface>> {
//     return this.httpClient.get<Array<TurmaInterface>>(this.url);
//   }

//   numeroTurmasCadastradas(): Observable<number> {
//     return this.getTurmas().pipe(
//       map(turmas => turmas.length)
//     );
//   }

//   getTurmasByDocente(docenteId: string): Observable<TurmaInterface[]> {
//     return this.httpClient.get<TurmaInterface[]>(`${this.url}`, {
//       params: { professor: docenteId }
//     });
//   }

//   getTurmasByDocenteName(docenteName: string): Observable<TurmaInterface[]> {
//     return this.httpClient.get<TurmaInterface[]>(`${this.url}?professor=${docenteName}`);
//   }

//   getTurmasByAlunoName(alunoName: string): Observable<TurmaInterface[]> {
//     return this.httpClient.get<TurmaInterface[]>(`${this.url}?aluno=${alunoName}`);
//   }
  
// }
