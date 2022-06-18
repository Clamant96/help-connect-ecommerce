import { ClienteService } from './../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../model/Cliente';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public confirmaSenha: string;
  public TipoUsuario: string;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    /* POSICIONA O SCROLL NO TOPO DA TELA */
    window.scroll(0, 0);

  }

  confirmarSenha(event:any){
    this.confirmaSenha= event.target.value;

  }

  tipoUsuario(event:any){
    this.TipoUsuario = event.target.value;

  }

  /* CADASTRA UM NOVO USUARIO NA BASE DE DADOS */
  cadastrar(){
    this.cliente.tipo = this.TipoUsuario;

    if(this.cliente.senha != this.confirmaSenha){
      this.alertas.alertaMensagem("A senha estão incorretas!")

    }else{
      this.clienteService.cadastrar(this.cliente).subscribe((resp: Cliente) => {
        this.cliente = resp;

        this.alertas.alertaMensagem('Usuário cadastrado com sucesso!');

        this.router.navigate(['/login']);

      })
    }
  }

}
