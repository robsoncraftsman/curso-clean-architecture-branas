import CalculadoraDeDistanciaEntreCeps from './CalculadoraDeDistanciaEntreCeps';
import CupomDescontoRepository from './CupomDescontoRepository';
import Pedido from './Pedido';
import Produto from './Produto';

export type CadastrarPedidoInput = {
  cpf: string;
  itens: { produto: Produto; valor: number; quantidade: number }[];
  cupomDesconto: string;
};

export type CadastrarPedidoOutput = {
  valorTotalPedido: number;
};

export default class CadastrarPedidoUseCase {
  constructor(private _cupomDescontoRepository: CupomDescontoRepository) {}

  execute(input: CadastrarPedidoInput): CadastrarPedidoOutput {
    const pedido = new Pedido(input.cpf);
    for (const item of input.itens) {
      pedido.addItem(item.produto, item.valor, item.quantidade);
    }
    if (input.cupomDesconto) {
      const cupomDesconto = this._cupomDescontoRepository.findCupomByCodigo(input.cupomDesconto);
      if (cupomDesconto) {
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    const valorTotalPedido = pedido.getValorTotal();
    return {
      valorTotalPedido
    };
  }
}
