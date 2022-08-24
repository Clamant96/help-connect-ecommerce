import { Cliente } from './../model/Cliente';
import { Compras } from './../model/Compras';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ClienteService } from '../service/cliente.service';
import { ComprasService } from '../service/compras.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  public nome = environment.nome;
  public email = environment.email;
  public foto = environment.foto
  public idUsuario = environment.id;

  public compra: Compras = new Compras();

  public idCompra: number;

  constructor(
    private router: Router,
    private compraService: ComprasService,
    private clienteService: ClienteService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.idCompra = this.route.snapshot.params['id'];

    this.findByIdCompra(this.idCompra);

  }

  findByIdCompra(id: number) {
    this.compraService.findByIdCompra(id).subscribe((resp: Compras) => {
      this.compra = resp;

    });

  }

}
