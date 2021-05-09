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

  findAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategorias = resp;

    })

  }

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

}
