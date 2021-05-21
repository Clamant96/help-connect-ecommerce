import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../model/Cliente';
import { AuthService } from '../service/auth.service';

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
    private auth: AuthService,
    private router: Router

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
      alert("A senha estão incorretas!")

    }else{
      this.auth.cadastrar(this.cliente).subscribe((resp: Cliente) => {
        this.cliente = resp;

        this.router.navigate(['/login']);
        alert('Usuário cadastrado com sucesso!');

      })
    }
  }

}
