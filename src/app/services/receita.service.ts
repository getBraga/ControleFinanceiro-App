import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receita } from '../models/Receita';

// A injeção está sendo feita no app module pelo provider
@Injectable()
// {providedIn: 'root'}
export class ReceitaService {
  baseUrl = 'https://localhost:7112/api/Receita';
  constructor(private http: HttpClient) {}
  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.baseUrl);
  }
  getReceitaById(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.baseUrl}/${id}`);
  }
}
