import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  findAllCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.endereco}/categorias`, this.autorizacao);
  }

  fintByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.endereco}/categorias/${id}`, this.autorizacao);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.endereco}/categorias`, categoria, this.autorizacao);
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.endereco}/categorias`, categoria, this.autorizacao);
  }

  deleteCategoria(id: number): Observable<Categoria> {

    return this.http.delete<Categoria>(`${this.endereco}/categorias/${id}`, this.autorizacao);
  }

}
