import { ClienteLogin } from './../model/ClienteLogin';
import { Cliente } from './../model/Cliente';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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

  /* PESQUISA UM USUARIO POR ID */
  findByIdCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.api}/clientes/${id}`, this.autorizacao);
  }

  /* CONSOME A API METODO LOGAR (POST) | ClienteLogin */
  entrar(clienteLogin: ClienteLogin): Observable<ClienteLogin> {

    return this.http.post<ClienteLogin>(`${this.api}/clientes/logar`, clienteLogin);
  }

  /* CONSOME A API METODO CADASTRAR (POST) | Cliente */
  cadastrar(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(`${this.api}/clientes/cadastrar`, cliente, this.autorizacao);
  }

  /* CONSOME A API METODO ATUALIZA (PUT) | Cliente */
  atualizar(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.api}/clientes`, cliente, this.autorizacao);
  }

  findByIdListaDeDesejos(id: number): Observable<ListaDeDesejos> {

    return this.http.get<ListaDeDesejos>(`${this.api}/listadesejo/${id}`, this.autorizacao);
  }

  findAllByProdutosListaDeDesejos(id: number): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/listadesejo/listaDeDesejo/${id}`, this.autorizacao);
  }

  findAllByListaDeDesejos(): Observable<ListaDeDesejos[]> {

    return this.http.get<ListaDeDesejos[]>(`${this.api}/listadesejo`, this.autorizacao);
  }

  removerItemListaDeDesejos(idProduto: number, idCliente: number): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/clientes/produto_lista/produtos/${idProduto}/listaDesejos/${idCliente}`, this.autorizacao);
  }

  removerItemDoCarrinho(idProduto: number, idCliente: number): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/clientes/produto_pedido/produtos/${idProduto}/pedidos/${idCliente}`, this.autorizacao);
  }

  /* RETONA UM VALOR true OU false CASO O TOKEN ESTA PREENCHIDO, CASO ESTEJA VAZIO RETONA false, CASO ESTEJA COM DADOS RETONA true*/
  logado() {
    /* CRIA UMA VARIAVEL BOOLEAN */
    let identificador: boolean = false;

    if(environment.token != '') {
      identificador = true;

    }

    /* RETORNA O VALOR DA VARIAVEL */
    return identificador;
  }

  /* DELOGA DA SESSAO */
  logout() {
    environment.id = 0;
    environment.nome = '';
    environment.usuario = '';
    environment.email = '';
    environment.senha = '';
    environment.foto = '';
    environment.tipo = '';
    environment.token = '';

    /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
    localStorage.removeItem('token');

    this.alertas.alertaMensagem('Logout realizado com sucesso!');

    this.router.navigate(['/login']);

  }

}
