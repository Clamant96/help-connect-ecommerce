import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-deletar-categoria',
  templateUrl: './deletar-categoria.component.html',
  styleUrls: ['./deletar-categoria.component.css']
})
export class DeletarCategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();
  idCategoria: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    /*if(environment.token == '') {
      this.router.navigate(['/login']);

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.idCategoria = this.route.snapshot.params['id'];

    this.fintByIdCategoria(this.idCategoria);

  }

  fintByIdCategoria(id: number) {
    this.categoriaService.fintByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  deleteCategoria() {
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(() => {
      this.router.navigate(['/categoria']);

    })

  }

}
