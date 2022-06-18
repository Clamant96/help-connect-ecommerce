import { Cliente } from './Cliente';
import { Categoria } from "./Categoria";

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
    public pedidos: Cliente[];
    public listaDesejos: Cliente[];

}
