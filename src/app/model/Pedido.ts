import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

export class Pedido {
    public id: number;
    public data: Date;
    public valorTotal: number;
    public qtdProduto: number;
    public produtos: Produto[];
    public cliente: Cliente;

}
