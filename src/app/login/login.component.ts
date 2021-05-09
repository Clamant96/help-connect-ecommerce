import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteLogin } from '../model/ClienteLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clienteLogin: ClienteLogin = new ClienteLogin();

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit(){

  }

  /* LOGA O USUARIO NA SESSAO */
  entrar() {
    this.auth.entrar(this.clienteLogin).subscribe((resp: ClienteLogin) => {
      this.clienteLogin = resp;

      environment.id = this.clienteLogin.id;
      environment.token = this.clienteLogin.token;
      environment.nome= this.clienteLogin.nome;
      environment.usuario= this.clienteLogin.usuario;
      environment.email= this.clienteLogin.email;
      environment.foto=this.clienteLogin.foto;

      console.log(environment.id );
      console.log(environment.token);
      console.log(environment.email);
      console.log(environment.nome);
      console.log(environment.usuario);

      this.router.navigate(['/home']);

    })

  }

}
