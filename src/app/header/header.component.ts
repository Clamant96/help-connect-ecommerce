import { ClienteService } from './../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public foto = environment.foto;
  public usuario = environment.usuario;
  public nome = environment.nome;
  public id = environment.id;

  constructor(
    public clienteService: ClienteService

  ) { }

  ngOnInit() {

  }

  /* PEMISSAO DE ADMINISTRADOR */
  adm (){
    let permissao = false;

    if(environment.tipo == 'adm') {
      permissao = true;

    }

    return permissao;

  }

}
