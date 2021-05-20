import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  nome = environment.nome;
  email = environment.email;

  pedido: Pedido = new Pedido();
  listaDePedidos: Pedido[];

  listaDeProdutos: Produto[];

  idCarrinho = environment.pedidos;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    /*let idProduto = this.route.snapshot.params['id-produto'];
    let idPedido = this.route.snapshot.params['id-pedido'];

    this.putProduto(idProduto, idPedido);*/

    this.findByIdProdutosCarrinho();
    this.findByIdPedido();

  }

  /* LISTA TODOS OS PEDIDOS CONTIDOS NA BASE DE DADOS */
  /*findAllByPedidos() {
    this.pedidoService.findAllByPedidos().subscribe((resp: Pedido[]) => {
      this.listaDePedidos = resp;

    })

  }*/

  /* POR MEIO DO ID TRAS SOMENTE OS DADOS DE UM UNICO PEDIDO */
  /*findByIdPedido(id: number) {
    this.pedidoService.findByIdPedido(id).subscribe((resp: Pedido) => {
      this.pedido = resp;

    })

  }*/

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(environment.pedidos).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  findByIdPedido() {
    this.pedidoService.findByIdPedido(environment.pedidos).subscribe((resp: Pedido) => {
      this.pedido = resp;

    })

  }

  removerDoCarrinho(idProduto: number, idPedido: number) {
    this.pedidoService.removerItemDoCarrinho(idProduto, idPedido).subscribe(() => {
      this.findByIdProdutosCarrinho();
      this.findByIdPedido();

    })

  }

  /* EM NOSSA ESTRUTURA ESSE METODO NAO SERA UTILIZADO, ESTA MAIS AQUI POR FINS DIDATICOS */
  postPedido() {
    this.pedidoService.postPedido(this.pedido).subscribe((resp: Pedido) => {
      this.pedido = resp;

      alert('Pedido cadastrado com sucesso');

      this.router.navigate(['/pedido']);

    })

  }

  putProduto(idProduto: number, idPedido: number) {
    this.pedidoService.putProduto(idProduto, idPedido).subscribe(() => {
      this.router.navigate(['/pedido']);

    })

  }

}
