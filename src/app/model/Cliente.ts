import { Compras } from './Compras';
import { Produto } from './Produto';

export class Cliente {
    public id: number;
    public nome: string;
    public usuario: string;
    public fone: string;
    public email: string;
    public cpf: string;
    public senha: string;
    public endereco: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cep: string;
    public cidade: string;
    public estado: string;
    public pais: string;
    public foto: string;
    public tipo: string;
    public pedidos: Produto[];
    public listaDeDesejos: Produto[];
    public valorTotal: number;
    public compras: Compras[];

}
