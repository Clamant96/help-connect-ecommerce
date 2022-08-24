import { ComprasService } from './../service/compras.service';
import { Compras } from './../model/Compras';
import { Correio } from './../model/Correio';
import { EnderecoEntrega } from './../model/EnderecoEntrega';
import { CorreioService } from './../service/correio.service';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/Cliente';
import { AlertasService } from '../service/alertas.service';

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
  public cep = environment.cep;

  public produto: Produto = new Produto();
  public listaDeDesejos: Produto[];
  public listaDeProdutoMemoria: Produto[];

  public usuario: Cliente = new Cliente();
  public usuarioFrete: Cliente = new Cliente();
  public correio: Correio = new Correio();
  public compra: Compras = new Compras();
  public confirmarSenha: string;
  public tipoUsuario: string;

  public qtdItensProdutos: number;
  public qtdItensListaDeDesejos: number;
  public qtdCompras: number;

  public valorFrete: string = "vazio";
  public frete: number = 0;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private alertas: AlertasService,
    private clienteService: ClienteService,
    private correioService: CorreioService,
    private comprasService: ComprasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findByIdUsuario(this.idUsuario);

    setTimeout(() => {
      this.calculaFreteAutomatico();
    }, 500);

  }

  // CARREGA DADOS DO USUARIO
  findByIdUsuario(id: number) {
    this.clienteService.findByIdCliente(id).subscribe((resp: Cliente) => {
      this.usuario = resp;

      this.qtdItensListaDeDesejos = this.usuario.listaDeDesejos.length;
      this.qtdItensProdutos = this.usuario.pedidos.length;
      this.qtdCompras = this.usuario.compras.length;

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

    this.usuario.pedidos = []; // EVITA QUE SEJA DELETADO OS ITENS JA INCLUSOS NOS CARRINHO PELAS TABELAS ASSOCIATIVAS
    this.usuario.listaDeDesejos = []; // EVITA QUE SEJA DELETADO OS ITENS JA INCLUSOS NOS CARRINHO PELAS TABELAS ASSOCIATIVAS

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

  carregaEndereco(event: any) {
    this.usuario.cep = event.target.value;

    event.target.value = event.target.value.replace("-", "");

    if(event.target.value.length == 8) {
      this.correioService.carregaEnderecoPorCEP(event.target.value).subscribe((resp: EnderecoEntrega) => {

        this.usuario.endereco = resp.logradouro;
        this.usuario.bairro = resp.bairro;
        this.usuario.cidade = resp.localidade;
        this.usuario.estado = resp.uf;
        this.usuario.pais = "Brasil";

      });

    }

  }

  carregaFrete(event: any) {

    this.valorFrete = "vazio";
    this.frete = 0;

    event.target.value = event.target.value.replace("-", "");

    if(event.target.value.length == 8) {

      let nCdServico: string = "41106";

      this.correioService.calculaValorFreteCarrinho(this.usuario.pedidos, nCdServico, event.target.value).subscribe((resp: number) => {
        this.valorFrete = String(resp);
      });

    }else {
      this.valorFrete = "vazio";

    }

  }

  calculaFreteAutomatico() {

    if(this.cep.length == 8) {

      let nCdServico: string = "41106";

      this.correioService.calculaValorFreteCarrinho(this.usuario.pedidos, nCdServico, this.cep).subscribe((resp: number) => {
        this.valorFrete = String(resp);
      });

    }else {
      this.valorFrete = "vazio";

    }

  }

  renderizaValorFrete(valor: number) {
    this.valorFrete = String(valor);
  }

  renderizaFrete(texto: string) {

    if(texto != "vazio") {
      return true;
    }

    return false;
  }

  finalizarCompra() {
    let user: Cliente = new Cliente();
    user.id = this.usuario.id;

    this.compra.cliente = user;
    this.compra.status = "Pedido realizado";

    this.comprasService.postCompra(this.compra).subscribe((resp: Compras) => {
      console.log("compra gerada com sucesso!");
      console.log(resp);

      this.comprasService.adicionaProdutoACompra(this.usuario.pedidos, resp.id, Number(this.valorFrete)).subscribe((retorno: boolean) => {
        console.log("produto inserido na compra com sucesso!");
        console.log(resp);

      }, erro => {
        console.log("ocorreu um erro com a insercao do produto na compra.");
        console.log(erro);

      })

      /*this.correioService.insereFreteNaCompra(resp.id, Number(this.valorFrete)).subscribe((resp: Compras) => {
        console.log('frete inserido no carrinho com sucesso!');
        console.log(resp);

      }, erro => {
        console.log('ocorreu um erro com a inserção do frete.');
        console.log(erro);

      });*/

      this.alertas.alertaMensagem('Pedido realizado com sucesso!');

      this.router.navigate(['/produto']);

    }, erro => {
      console.log("ocorreu um erro com a geracao da compra.");
      console.log(erro);

    })

  }

  renderizaSubtotal(frete: string, valorCarrinho: number) {
    let retorno: number = 0;

    retorno = Number(frete) + valorCarrinho;

    return retorno;
  }

}
