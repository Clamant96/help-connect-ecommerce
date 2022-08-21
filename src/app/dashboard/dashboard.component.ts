import { CategoriaService } from 'src/app/service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public nome = environment.nome;
  public email = environment.email;
  public foto = environment.foto;
  public tipo = environment.tipo;
  public id = environment.id;

  public listaDeProdutos: Produto[];
  public produto: Produto = new Produto();

  public categoria: Categoria = new Categoria();
  public listaDeCategoria: Categoria[];
  public idCategoria: number;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    this.findAllByCategoria();

  }

  /* LISTAGEM DE PRODUTOS NO DASHBOARD */
  /* TRAZ TODOS OS PRODUTOS CADASTRADOS NA BASE DE DADOS */
  findAllByProdutos() {
    this.produtoService.findAllByProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  /* TRAZ SOMENTE UM UNICO PRODUTO POR MEIO DE SEUS ID */
  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  /* INSERE NA BASE DE DADOS UM NOVO PRODUTO */
  postProduto() {
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    console.log(this.produto);

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      this.alertas.alertaMensagem('Produto adicionado com sucesso!');

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

      this.alertas.alertaMensagem('Produto atualizado com sucesso!');

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
      this.alertas.alertaMensagem('Produto deleteado com sucesso!');

      this.findAllByProdutos();
    })

  }

  /* LISTAGEM DE CATEGORIAS NO DASHBOARD */
  /* TRAZ SOMENTE UM UNICO CATEGORIA POR MEIO DE SEUS ID */
  findByIdCategoria() {
    this.categoriaService.fintByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* TRAZ UM ITEM ESPECIFICO DE CATEGORIA INFORMANDO COMO PARAMETRO UM ID */
  findByIdCategoriaPut(id: number) {
    this.categoriaService.fintByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* TRAZ TODAS AS CATEGORIAS CADASTRADOS NA BASE DE DADOS */
  findAllByCategoria() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    })

  }

  /* CRIAR UM NOVO ITEM DE CATEGORIA NA BASE DE DADOS */
  postCategoria() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;
      this.alertas.alertaMensagem(`Categoria: ${this.categoria.nome} cadastrada com sucesso!`);

      this.categoria = new Categoria();

      this.findAllByCategoria();

    }, erro => {
      if(erro.status == 500) {
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`);

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`);

      }

    })

  }

  /* ATUALIZA UM DADO DE CATEGORIA NA BASE DE DADOS POR MEIO DO ID */
  putCategoria() {
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

      this.alertas.alertaMensagem(`Categoria: ${this.categoria.nome} atualizada com sucesso!`);

      this.categoria = new Categoria();
      this.findAllByCategoria();

    }, erro => {
      if(erro.status == 500) {
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`)

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`)

      }

    })

  }

  /* EXCLUI UM DADO DE CATEGORIA NA BASE DE DADOS POR MEIO DO ID */
  deleteCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(() => {
      this.alertas.alertaMensagem('Categoria excluida com sucesso!');

      this.findAllByCategoria();
    })

  }

}
