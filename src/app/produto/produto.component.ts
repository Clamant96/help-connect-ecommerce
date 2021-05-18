import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto();
  listaDeProdutos: Produto[];

  categoria: Categoria = new Categoria();
  listaDeCategoria: Categoria[];
  idCategoria: number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    this.findAllByCategoria();

  }

  /* TRAZ TODOS OS PRODUTOS CADASTRADOS NA BASE DE DADOS */
  findAllByProdutos() {
    this.produtoService.findAllByProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  findAllByCategoria() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    })

  }

  /* TRAZ SOMENTE UM UNICO PRODUTO POR MEIO DE SEUS ID */
  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  /* TRAZ SOMENTE UM UNICO CATEGORI POR MEIO DE SEUS ID */
  findByIdCategoria() {
    this.categoriaService.fintByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* TRAZ UM ARRAY DE PRODUTOS POR MEIO DE UMA QUERY DE NOME */
  findAllByNomeProdutos(nome: string) {
    this.produtoService.findAllByNomeProdutos(nome).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  /* INSERE NA BASE DE DADOS UM NOVO PRODUTO */
  postProduto() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      this.produto = new Produto();
      this.findAllByProdutos();

    }, erro => {
      if(erro.status == 500) {
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`)

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`)

      }

    })

  }

  /* ATUALIZA UM PRODUTO JA EXISTENTE NA BASE DE DADOS */
  putProduto() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      this.produto = new Produto();
      this.findAllByProdutos();

    }, erro => {
      if(erro.status == 500) {
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`)

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`)

      }

    })

  }

  /* EXCLUI DA BASE DE DADOS UM PRODUTO JA EXISTENTE */
  deleteProduto(id: number) {
    this.produtoService.deleteProduto(id).subscribe(() => {

      this.findAllByProdutos();
    })

  }

}
