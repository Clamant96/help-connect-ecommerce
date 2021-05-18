import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-inserir-produto',
  templateUrl: './inserir-produto.component.html',
  styleUrls: ['./inserir-produto.component.css']
})
export class InserirProdutoComponent implements OnInit {

  public produto: Produto = new Produto();
  public idProduto: number;
  public idPedido: number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    if(environment.token = '') {
      this.router.navigate(['/login'])

    }

    this.idProduto = this.route.snapshot.params['idProduto'];
    this.idPedido = this.route.snapshot.params['idPedido'];

    this.findByIdProduto(this.idProduto);

  }

  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  putCategoria() {
    this.produtoService.compraProduto(this.idProduto, this.idPedido).subscribe(() => {
      this.router.navigate(['/produto']);

    })

  }

}
