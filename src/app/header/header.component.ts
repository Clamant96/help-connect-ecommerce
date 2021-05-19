import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  foto = environment.foto;
  usuario = environment.usuario;
  nome = environment.nome;

  constructor(
    public auth: AuthService

  ) { }

  ngOnInit() {

  }

}
