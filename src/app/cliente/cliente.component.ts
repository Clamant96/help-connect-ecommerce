import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Produto } from '../model/Produto';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/Cliente';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';
import { Pedido } from '../model/Pedido';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public nome = environment.nome;
  public email = environment.email;
  public foto = environment.foto
  public idUsuario = environment.id;

  public produto: Produto = new Produto();
  public listaDeDesejos: Produto[];
  public listaDeProdutoMemoria: Produto[];

  public usuario: Cliente = new Cliente();
  public confirmarSenha: string;
  public tipoUsuario: string;

  public qtdItensProdutos: number;
  public qtdItensListaDeDesejos: number;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alertas: AlertasService,
    private clienteService: ClienteService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findByIdUsuario(this.idUsuario);

  }

  // CARREGA DADOS DO USUARIO
  findByIdUsuario(id: number) {
    this.clienteService.findByIdCliente(id).subscribe((resp: Cliente) => {
      this.usuario = resp;

      this.qtdItensListaDeDesejos = this.usuario.listaDeDesejos.length;
      this.qtdItensProdutos = this.usuario.pedidos.length;

    });

  }

  /* VERIFICA SE A SENHA CRIADA E MESMA DE CONFIRME SENHA */
  confirmeSenha(event: any) {
    /* ATRIBUI O DADO VINDO DO HTML POR MEIO DO [(ngModel)] A VARIAVEL CRIADA */
    this.confirmarSenha = event.target.value;

  }

  tipoUser(event: any) {
    /* ATRIBUI O DADO VINDO DO HTML POR MEIO DO [(ngModel)] A VARIAVEL CRIADA */
    this.tipoUsuario = event.target.value;

  }

  // ATUALIZA DADOS USUARIO
  atualizar() {
    /* INSERE O TIPO DE USUARIO SELECIONADO, AO ATRIBUTO NA BASE DE DADOS */
    this.usuario.tipo = this.tipoUsuario;

    /* VERIFICA SE AS SENHAS DIGITADAS, SAO IGUAIS */
    if(this.usuario.senha != this.confirmarSenha) {
      /* INFORMA UM ALERTA AO USUARIO */
      this.alertas.alertaMensagem('As senhas estao incorretas!');

    }else {
      /* CHAMA O METODO CADASTRAR CRIADO NO NOSSO SERVICE */
      /* subscribe ==> CONVERTE UM ARQUIVO TypeScript EM UM ARQUIVO JSON/JavaScript */
      /* ARMAZENA OS DADOS DENTRO DE UM ATRIBUTO TEMPORARIO CHAMADO resp */
      this.clienteService.atualizar(this.usuario).subscribe((resp: Cliente) => {
        /* POR SUA VEZ ATRIBUI OS DADOS DE resp AO USUARIO DENTRO DA BASE DE DADOS*/
        this.usuario = resp;
        /* INFORMA UM ALERTA AO USUARIO DE CADASTRO BEM SUCEDIDO */
        this.alertas.alertaMensagem('Dados atualizados com sucesso, faça login novamente!');

        environment.id = 0;
        environment.nome = '';
        environment.usuario = '';
        environment.email = '';
        environment.senha = '';
        environment.foto = '';
        environment.tipo = '';
        environment.token = '';

        /* REDIRECIONA O USUARIO A PAGINA DE login APOS O CADASTRO TER SIDO REALIZADO COM SUCESSO */
        this.router.navigate(['/login']);

        /* CASO OCORRA UMA MENSAGEM DE ERRO, MOSTRA ESSE ERRO NO CONSOLE */
      }, erro => {
        console.log(erro.status);
        console.log(erro);

      });

    }

  }

  // REMOVE ITEM DA LSITA DE DESEJOS
  removerDaListaDeDesejos(idProduto: number, idLista: number) {
    this.clienteService.removerItemListaDeDesejos(idProduto, idLista).subscribe(() => {
      this.alertas.alertaMensagem('Item removido da lista de desejos');

      // CARREGA DADOS CARRINHO USUARIO
      this.findByIdUsuario(this.idUsuario);

    })

  }

  // ADICIONA PRODUTOS AO CARRINHO DO USUARIO
  adicionaItemCarrinho(idProduto: number, idUsuario: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, idUsuario).subscribe(() => {

      // CARREGA DADOS CARRINHO USUARIO
      this.findByIdUsuario(this.idUsuario);

    })

  }

  // REMOVE ITEM DO CARRINHO
  removerDoCarrinho(idProduto: number, idUsuario: number) {
    this.clienteService.removerItemDoCarrinho(idProduto, idUsuario).subscribe(() => {
      this.alertas.alertaMensagem('Item removido do carrinho!');

      // CARREGA DADOS CARRINHO USUARIO
      this.findByIdUsuario(this.idUsuario);

    })

  }

  // PEMISSAO DE ADMINISTRADOR
  adm (){
    let permissao = false;

    if(environment.tipo == 'adm') {
      permissao = true;

    }

    return permissao;

  }

}
