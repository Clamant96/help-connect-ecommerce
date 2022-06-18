import { ClienteService } from './../service/cliente.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteLogin } from '../model/ClienteLogin';
import { AuthService } from '../service/auth.service';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clienteLogin: ClienteLogin = new ClienteLogin();

  /* ARMAZENA O TOKEN DO USUARIO */
  tokenUsuario: string;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit(){

  }

  /* LOGA O USUARIO NA SESSAO */
  entrar() {
    this.clienteService.entrar(this.clienteLogin).subscribe((resp: ClienteLogin) => {
      this.clienteLogin = resp;

      this.alertas.alertaMensagem('Login realizado com sucesso!');

      environment.token = this.clienteLogin.token;
      environment.nome= this.clienteLogin.nome;
      environment.email= this.clienteLogin.email;
      environment.foto=this.clienteLogin.foto;
      environment.tipo=this.clienteLogin.tipo;
      environment.usuario= this.clienteLogin.usuario;
      environment.id = this.clienteLogin.id;

      /* ARMAZENA O TOKEN DO USUARIO NA VARIAVEL */
      this.tokenUsuario = this.clienteLogin.token;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', this.tokenUsuario);

      console.log("ID: "+ environment.id);
      console.log("Token: "+ environment.token);
      console.log("E-mail: "+ environment.email);
      console.log("Nome: "+ environment.nome);
      console.log("Usuario: "+ environment.usuario);
      console.log("Foto: "+ environment.foto);

      this.router.navigate(['/home']);

    })

  }

}
