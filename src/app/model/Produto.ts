import { Categoria } from "./Categoria";
import { Pedido } from "./Pedido";

export class Produto {
    public id: number;
    public nome: string;
    public descricao: string;
    public marca: string;
    public img: string;
    public preco: number;
    public estoque: number;
    public qtdPedidoProduto: number;
    public categoria: Categoria;
    public pedidos: Pedido[];

}
