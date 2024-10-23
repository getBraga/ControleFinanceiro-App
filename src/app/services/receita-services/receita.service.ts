import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Receita } from '../../models/Receita';

// A injeção está sendo feita no app module pelo provider
@Injectable()
// {providedIn: 'root'}
export class ReceitaService {
  baseUrl = 'https://localhost:7112/api/Receita';
  constructor(private http: HttpClient) {}
  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.baseUrl).pipe(take(1));
  }
  getReceitaById(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.baseUrl}/${id}`).pipe(take(1));
  }
  post(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.baseUrl, receita).pipe(take(1));
  }
  put(receita: Receita): Observable<Receita> {
    return this.http
      .put<Receita>(`${this.baseUrl}/${receita.id}`, receita)
      .pipe(take(1));
  }
  deleteReceita(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
