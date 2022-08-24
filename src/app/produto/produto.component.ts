import { ComprasService } from './../service/compras.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public produto: Produto = new Produto();
  public listaDeProdutos: Produto[];
  public idCliente = environment.id;

  public categoria: Categoria = new Categoria();
  public listaDeCategoria: Categoria[];
  public idCategoria: number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private alertas: AlertasService,
    private comprasService: ComprasService

  ) { }

  ngOnInit() {

    if(localStorage.getItem('token') == null) {
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
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`);

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`);

      }else {
        console.log(`Erro: ${erro.status}.`);
      }

    })

  }

  /* ADICIONA PRODUTOS A LISTA DE DESEJOS DO USUARIO */
  adicionaItemListaDeDesejos(idProduto: number, idCliente: number) {
    this.produtoService.adicionaItemListaDeDesejos(idProduto, idCliente).subscribe(() => {
      this.alertas.alertaMensagem('Produto adicionado a lista de desejos!');

      this.findAllByProdutos();

    })

  }

  /* ADICIONA PRODUTOS AO CARRINHO DO USUARIO */
  adicionaItemCarrinho(idProduto: number, idCliente: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, idCliente).subscribe(() => {
      this.alertas.alertaMensagem('Produto adicionado ao carrinho!');

      this.findAllByProdutos();

    })

  }

  /* EXCLUI DA BASE DE DADOS UM PRODUTO JA EXISTENTE */
  deleteProduto(id: number) {
    this.produtoService.deleteProduto(id).subscribe(() => {
      this.alertas.alertaMensagem('Produto deleteado com sucesso!');

      this.findAllByProdutos();
    })

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
