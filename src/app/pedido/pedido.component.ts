import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  public nome = environment.nome;
  public email = environment.email;
  public id = environment.id;

  public pedido: Pedido = new Pedido();
  public listaDePedidos: Pedido[];

  public listaDeProdutos: Produto[];
  public memoria: Produto[] = [];
  public memoriaV: Produto[] = [];

  public idMemoria: number;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findByIdProdutosCarrinho();
    this.findByIdPedido();

  }

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(this.id).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

      let contador: number = 0;
      let repeticao: number = 0;

      // CRIA UM VETOR PARA SERVIR DE REFERENCIA NAS VALIDACOES
      let pivo: number[] = [this.listaDeProdutos.length];

      for(let i = 0; i < this.listaDeProdutos.length; i++) {
        // ARMAZENA O ID DENTRO DO PIVO PARA SERVIR DE REFERENCIA
        pivo[i] = this.listaDeProdutos[i].id;

        // ENTRA NO LOOP DO PRODUTO TRABALHO NO MOMENTO
        for(let item of this.listaDeProdutos) {
          // VERIFICA SE O VALOR DO PIVO E O MESMO DO ID DO LOOP ATUAL NO QUAL ESTAMOS TRABALHANDO
          if(pivo[i] == item.id) {
            // ADICIONA UM AO CONTADOR
            contador++;

          }

          // ATRIBUI O VALOR DO CONTADOR A QTD DE UM DETERMINADO PRODUTO DE ACORDO COM A QTD DESSE MESMO PRODUTO NA LISTA
          this.listaDeProdutos[i].qtdPedidoProduto = contador;

        }

        // INSERE O PRIMEIRO VALOR PARA INICIALIZAR OS VALORES NO VETOR
        this.memoria = this.listaDeProdutos;

        let ids = [];

        for(let i = 0; i < this.memoria.length; i++) {
          ids.push(this.memoria[i].nome);
        }

        for(let i = 0; i < this.memoria.length; i++) {
          for(let j = 0; j < this.memoria.length; j++) {
            if(ids.indexOf(this.memoria[j].nome) == -1) {
              this.memoriaV.push(this.memoria[i]);
            }
          }
        }

        console.log(this.memoriaV);

        this.listaDeProdutos = this.memoriaV;

        // ZERA O CONTADO PARA REMOCMECAR UMA NOVA CONTAGEM
        contador = 0;

			}

    })

  }

  findByIdPedido() {
    this.pedidoService.findByIdPedido(this.id).subscribe((resp: Pedido) => {
      this.pedido = resp;

    })

  }

  removerDoCarrinho(idProduto: number, idPedido: number) {
    this.pedidoService.removerItemDoCarrinho(idProduto, idPedido).subscribe(() => {
      this.alertas.alertaMensagem('Item removido do carrinho!');

      this.findByIdProdutosCarrinho();
      this.findByIdPedido();

    })

  }

  /* EM NOSSA ESTRUTURA ESSE METODO NAO SERA UTILIZADO, ESTA MAIS AQUI POR FINS DIDATICOS */
  postPedido() {
    this.pedidoService.postPedido(this.pedido).subscribe((resp: Pedido) => {
      this.pedido = resp;

      this.alertas.alertaMensagem('Pedido cadastrado com sucesso');

      this.router.navigate(['/pedido']);

    })

  }

}
