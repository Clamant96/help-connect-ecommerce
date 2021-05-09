import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();

  constructor(
    private router: Router,
    private categoriaServie: CategoriaService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    let id = this.route.snapshot.params['id'];

    this.fintByIdCategoria(id)
  }

  fintByIdCategoria(id: number) {
    this.categoriaServie.fintByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    })

  }

  putCategoria() {
    this.categoriaServie.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;
      alert('Categoria altarad com sucesso!');

      this.router.navigate(['/categoria']);

    })

  }

}
