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

  nome = environment.nome;
  email = environment.email;
  foto = environment.foto
  idUsuario = environment.id;
  idPedido = environment.pedidos;

  minhListaDeDesejos: ListaDeDesejos = new ListaDeDesejos();
  listaDeDesejosItens: ListaDeDesejos[];
  idListaDeDesejos = environment.listaDeDesejos;

  produto: Produto = new Produto();
  listaDeDesejos: Produto[];
  listaDeProdutoMemoria: Produto[];

  usuario: Cliente = new Cliente();
  confirmarSenha: string;
  tipoUsuario: string;

  /* DADOS CARRINHO USUARIO */
  pedido: Pedido = new Pedido();
  listaDePedidos: Pedido[];

  listaDeProdutos: Produto[];
  memoria: Produto[] = [];
  memoriaV: Produto[] = [];

  idCarrinho = environment.pedidos;

  idMemoria: number;
  /* ###################### */

  constructor(
    private router: Router,
    private listaDeDesejosService: ClienteService,
    private authService: AuthService,
    private produtoService: ProdutoService,
    private alertas: AlertasService,

    /* DADOS CARRINHO USUARIO */
    private pedidoService: PedidoService,

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    /*if(environment.token == '') {
      this.router.navigate(['/login']);

    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findByIdListaDeDesejos();
    this.findByIdUsuario(environment.id);
    //this.findAllByProduto();

    /* DADOS CARRINHO USUARIO */
    this.findByIdProdutosCarrinho();
    this.findByIdPedido();

  }

  findByIdUsuario(id: number) {
    this.authService.findByIdCliente(id).subscribe((resp: Cliente) => {
      this.usuario = resp;

      console.log("Nome: "+ this.usuario.nome);

    })

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
      this.authService.cadastrar(this.usuario).subscribe((resp: Cliente) => {
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
        environment.pedidos = 0;
        environment.listaDeDesejos = 0;

        /* REDIRECIONA O USUARIO A PAGINA DE login APOS O CADASTRO TER SIDO REALIZADO COM SUCESSO */
        this.router.navigate(['/login']);

        /* CASO OCORRA UMA MENSAGEM DE ERRO, MOSTRA ESSE ERRO NO CONSOLE */
      }, erro => {
        console.log(erro.status);
        console.log(erro);

      });

    }

  }

  findByIdListaDeDesejos() {
    this.listaDeDesejosService.findAllByProdutosListaDeDesejos(environment.listaDeDesejos).subscribe((resp: Produto[]) => {
      this.listaDeDesejos = resp;

    })

  }

  removerDaListaDeDesejos(idProduto: number, idLista: number) {
    this.listaDeDesejosService.removerItemListaDeDesejos(idProduto, idLista).subscribe(() => {
      this.alertas.alertaMensagem('Item removido da lista de desejos');

      this.findByIdPedido();
      this.findByIdListaDeDesejos();

    })

  }

  /* ADICIONA PRODUTOS AO CARRINHO DO USUARIO */
  adicionaItemCarrinho(idProduto: number, idCarrinho: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, idCarrinho).subscribe(() => {
      /* DADOS CARRINHO USUARIO */
      this.findByIdProdutosCarrinho();

    })

  }

  /* ################################################################################# */
  /* ################## DADOS CARRINHO USUARIO ################## */

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(environment.pedidos).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

      let contador: number = 0;
      let repeticao: number = 0;

      // CRIA UM VETOR PARA SERVIR DE REFERENCIA NAS VALIDACOES
      let pivo: number[] = [this.listaDeProdutos.length];

      for(let i = 0; i < this.listaDeProdutos.length; i++) {
        // ARMAZENA O ID DENTRO DO PIVO PARA SERVIR DE REFERENCIA
        pivo[i] = this.listaDeProdutos[i].id;

        // ENTRA NO LOOP DO PRODUTO TRABALHO NO MOMENTO
        for(let item of this.listaDeProdutos) {
          // VERIFICA SE O VALOR DO PIVO E O MESMO DO ID DO LOOP ATUAL NO QUAL ESTAMOS TRABALHANDO
          if(pivo[i] == item.id) {
            // ADICIONA UM AO CONTADOR
            contador++;

          }

          // ATRIBUI O VALOR DO CONTADOR A QTD DE UM DETERMINADO PRODUTO DE ACORDO COM A QTD DESSE MESMO PRODUTO NA LISTA
          this.listaDeProdutos[i].qtdPedidoProduto = contador;

        }

        // INSERE O PRIMEIRO VALOR PARA INICIALIZAR OS VALORES NO VETOR
        this.memoria = this.listaDeProdutos;

        // ZERA O CONTADO PARA REMOCMECAR UMA NOVA CONTAGEM
        contador = 0;

			}

    })

  }

  findByIdPedido() {
    this.pedidoService.findByIdPedido(environment.pedidos).subscribe((resp: Pedido) => {
      this.pedido = resp;

    })

  }

  removerDoCarrinho(idProduto: number, idPedido: number) {
    this.pedidoService.removerItemDoCarrinho(idProduto, idPedido).subscribe(() => {
      this.alertas.alertaMensagem('Item removido do carrinho!');

      this.findByIdProdutosCarrinho();
      this.findByIdPedido();

    })

  }

  /* EM NOSSA ESTRUTURA ESSE METODO NAO SERA UTILIZADO, ESTA MAIS AQUI POR FINS DIDATICOS */
  postPedido() {
    this.pedidoService.postPedido(this.pedido).subscribe((resp: Pedido) => {
      this.pedido = resp;

      this.alertas.alertaMensagem('Pedido cadastrado com sucesso');

      this.router.navigate(['/pedido']);

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
