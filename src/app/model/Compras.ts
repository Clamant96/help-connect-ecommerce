import { Produto } from './Produto';
import { Cliente } from './Cliente';

export class Compras {
  public id: number;
	public numeroPedido: string;
	public meuPedido: Produto[];
	public cliente: Cliente;
	public status: string;
	public valorTotal: number;
}
