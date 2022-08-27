import { Produto } from './../model/Produto';
import { Observable } from 'rxjs';
import { Compras } from './../model/Compras';
import { AlertasService } from './alertas.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  api = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertas: AlertasService

  ) { }

  findAllCompras(): Observable<Compras[]> {

    return this.http.get<Compras[]>(`${this.api}/compras/`, this.autorizacao);
  }

  findByIdCompra(id: number): Observable<Compras> {

    return this.http.get<Compras>(`${this.api}/compras/${id}`, this.autorizacao);
  }

  adicionaProdutoACompra(produtos: Produto[], idCompra: number, frete: number): Observable<boolean> {

    return this.http.post<boolean>(`${this.api}/compras/produto_compra/compra/${idCompra}/frete/${frete}`, produtos, this.autorizacao);
  }

  enviarEmail(id: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.api}/compras/email/${id}`, this.autorizacao);
  }

  postCompra(compra: Compras): Observable<Compras> {

    return this.http.post<Compras>(`${this.api}/compras`, compra, this.autorizacao);
  }

  putCompra(compra: Compras): Observable<Compras> {

    return this.http.put<Compras>(`${this.api}/compras`, compra, this.autorizacao);
  }

  deleteByIdCompra(id: number): Observable<Compras> {

    return this.http.delete<Compras>(`${this.api}/compras/${id}`, this.autorizacao);
  }

}
