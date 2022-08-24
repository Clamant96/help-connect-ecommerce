import { CorreioService } from './../service/correio.service';
import { Correio } from './../model/Correio';
import { AlertasService } from 'src/app/service/alertas.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../service/produto.service';
import { Produto } from './../model/Produto';
import { Categoria } from 'src/app/model/Categoria';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-foco-produto',
  templateUrl: './foco-produto.component.html',
  styleUrls: ['./foco-produto.component.css']
})
export class FocoProdutoComponent implements OnInit {

  public produto: Produto = new Produto();
  public listaDeProdutos: Produto[];
  public idCliente = environment.id;

  public categoria: Categoria = new Categoria();
  public listaDeCategoria: Categoria[];
  public idCategoria: number;

  public idProduto: number;

  public correio: Correio = new Correio();

  public valorFrete: string = "vazio";

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private alertas: AlertasService,
    private route: ActivatedRoute,
    private correioService: CorreioService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.idProduto = this.route.snapshot.params['id'];

    this.findByIdProduto(this.idProduto);

  }

  /* TRAZ SOMENTE UM UNICO PRODUTO POR MEIO DE SEUS ID */
  findByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  /* ADICIONA PRODUTOS AO CARRINHO DO USUARIO */
  adicionaItemCarrinho(idProduto: number, idCliente: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, idCliente).subscribe(() => {
      this.alertas.alertaMensagem('Produto adicionado ao carrinho!');

      this.findByIdProduto(this.idProduto);

    })

  }

  /* ADICIONA PRODUTOS A LISTA DE DESEJOS DO USUARIO */
  adicionaItemListaDeDesejos(idProduto: number, idCliente: number) {
    this.produtoService.adicionaItemListaDeDesejos(idProduto, idCliente).subscribe(() => {
      this.alertas.alertaMensagem('Produto adicionado a lista de desejos!');

      this.findByIdProduto(this.idProduto);

    })

  }

  carregaEndereco(event: any) {

    event.target.value = event.target.value.replace("-", "");

    if(event.target.value.length == 8) {
      this.correio.nCdEmpresa = "";
      this.correio.sDsSenha = "";
      this.correio.nCdServico = "41106";
      this.correio.sCepOrigem = "06029000";
      this.correio.sCepDestino = event.target.value;
      this.correio.nVlPeso = String(this.produto.peso);
      this.correio.nCdFormato = "1";
      this.correio.nVlComprimento = String(this.produto.comprimento);
      this.correio.nVlAltura = String(this.produto.altura);
      this.correio.nVlLargura = String(this.produto.largura);
      this.correio.nVlDiametro = "0";
      this.correio.sCdMaoPropria = "s";
      this.correio.nVlValorDeclarado = String(this.produto.preco);
      this.correio.sCdAvisoRecebimento = "s";
      this.correio.strRetorno = "xml";

      this.valorFrete = "vazio";

      this.correioService.calculaValorFrete(this.correio).subscribe((resp: string) => {
        this.valorFrete = resp;

      }, erro => {
        this.valorFrete = erro.error.text;

      });

    }else {
      this.valorFrete = "vazio";

    }

  }

  renderizaFrete(texto: string) {

    if(texto != "vazio") {
      return true;
    }

    return false;
  }

}
