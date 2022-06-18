import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';
import { ClienteLogin } from '../model/ClienteLogin';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* GERA UMA URL DINAMICA TRAZENDO OS DADOS DO VALOR GLOBAL */
  public endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  /* INJETA DEPENDENCIAS DENTRO DO SERVICE */
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertas: AlertasService

  ) { }

  /* PESQUISA UM USUARIO POR ID */
  findByIdCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.endereco}/clientes/${id}`, this.autorizacao);
  }

  /* CONSOME A API METODO LOGAR (POST) | ClienteLogin */
  entrar(clienteLogin: ClienteLogin): Observable<ClienteLogin> {

    return this.http.post<ClienteLogin>(`${this.endereco}/clientes/logar`, clienteLogin);
  }

  /* CONSOME A API METODO CADASTRAR (POST) | Cliente */
  cadastrar(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(`${this.endereco}/clientes/cadastrar`, cliente, this.autorizacao);
  }

  /* CONSOME A API METODO ATUALIZA (POST) | Cliente */
  atualizar(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.endereco}/clientes/atualizar`, cliente, this.autorizacao);
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
