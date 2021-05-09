import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  listaDeProdutos: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    let id = this.route.snapshot.params['id'];

  }

  findAllByProdutos() {
    this.produtoService.findAllByProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  findAllByNomeProdutos(nome: string) {
    this.produtoService.findAllByNomeProdutos(nome).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  postProduto() {
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      this.router.navigate(['/produto'])

    })

  }

}
