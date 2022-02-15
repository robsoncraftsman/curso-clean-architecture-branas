import Pedido from '../domain/entity/Pedido';
import PedidoRepository from '../domain/repository/PedidoRepository';

export type ConsultarPedidoInput = {
  id: string;
};

export type ConsultarItemPedidoOutput = {
  produto: string;
  valor: number;
  quantidade: number;
};

export type ConsultarPedidoOutput = {
  id: string;
  valorItens: number;
  valorItensComDesconto: number;
  itens: ConsultarItemPedidoOutput[];
};

export default class ConsultarPedidoUseCase {
  constructor(private _pedidoRepository: PedidoRepository) {}

  async execute(input: ConsultarPedidoInput): Promise<ConsultarPedidoOutput | null> {
    const pedidoDb = await this._pedidoRepository.findById(input.id);
    if (!pedidoDb) return Promise.resolve(null);
    const consultarItensPedidoOutput: ConsultarItemPedidoOutput[] = [];
    for (const itemPedidoDb of pedidoDb.itens) {
      const consultarItemPedidoOutput: ConsultarItemPedidoOutput = {
        produto: itemPedidoDb.produto.nome,
        valor: itemPedidoDb.valorUnitario,
        quantidade: itemPedidoDb.quantidade
      };
      consultarItensPedidoOutput.push(consultarItemPedidoOutput);
    }

    const output: ConsultarPedidoOutput = {
      id: pedidoDb.id,
      valorItens: pedidoDb.getValorItens(),
      valorItensComDesconto: pedidoDb.getValorItensComDesconto(),
      itens: consultarItensPedidoOutput
    };
    return Promise.resolve(output);
  }
}
