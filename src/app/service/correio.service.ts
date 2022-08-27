import { Compras } from './../model/Compras';
import { Produto } from './../model/Produto';
import { Correio } from './../model/Correio';
import { EnderecoEntrega } from './../model/EnderecoEntrega';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CorreioService {

  endereco = environment.server + environment.port;

  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  carregaEnderecoPorCEP(cep: string): Observable<EnderecoEntrega> {

    return this.http.get<EnderecoEntrega>(`${this.endereco}/correios/${cep}`, this.autorizacao);
  }

  calculaValorFrete(correio: Correio): Observable<string> {

    return this.http.post<string>(`${this.endereco}/correios/frete`, correio, this.autorizacao);
  }

  calculaValorFreteCarrinho(produtos: Produto[], numeroPedido: string, cep: string): Observable<number> {

    return this.http.post<number>(`${this.endereco}/correios/calcula-frete/numeroPedido/${numeroPedido}/cep/${cep}`, produtos, this.autorizacao);
  }

}
