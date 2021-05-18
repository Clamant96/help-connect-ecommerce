import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();
  listaDeCategorias: Categoria[];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/login'])

    }

    this.findAllCategorias();

  }

  /* TRAZ TODOS OS ITENS CONTIDO DENTRO DA BASE DE DADOS DE CATEGORIA, DESSA FORMA RETORNANDO UM ARRAY */
  findAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategorias = resp;

    })

  }

  /* TRAZ UM ITEM ESPECIFICO DE CATEGORIA INFORMANDO COMO PARAMETRO UM ID */
  findByIdCategoria(id: number) {
    this.categoriaService.fintByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  /* CRIAR UM NOVO ITEM DE CATEGORIA NA BASE DE DADOS */
  postCategoria() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;
      alert(`Categoria: ${this.categoria.nome} cadastrada com sucesso!`)

      this.categoria = new Categoria();

      this.findAllCategorias();

    }, erro => {
      if(erro.status == 500) {
        console.log(`Erro: ${erro.status}, algum dado esta sendo inserido incorretamente.`)

      }else if(erro.status >= 400 && erro.status < 500){
        console.log(`Erro: ${erro.status}, acesso nao autorizado, verifique seu login.`)

      }

    })

  }

  /* ATUALIZA UM DADO DE CATEGORIA NA BASE DE DADOS POR MEIO DO ID */
  putCategoria() {
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;

      this.categoria = new Categoria();
      this.findAllCategorias();

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

      this.findAllCategorias();

    })

  }

}
