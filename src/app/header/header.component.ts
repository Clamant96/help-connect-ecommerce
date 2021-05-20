import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  foto = environment.foto;
  usuario = environment.usuario;
  nome = environment.nome;

  listaDeProdutos: Produto[];
  tamanhoCarrinho: number;

  constructor(
    public auth: AuthService,
    private pedidoService: PedidoService

  ) { }

  ngOnInit() {

    this.findByIdProdutosCarrinho();

  }

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(environment.pedidos).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

      this.tamanhoCarrinho = this.listaDeProdutos.length;

    })

  }

}
