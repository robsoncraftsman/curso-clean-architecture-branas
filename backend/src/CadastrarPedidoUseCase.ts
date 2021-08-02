import { CompoundAssignmentOperator } from 'typescript';
import CupomDesconto from './CupomDesconto';
import CupomDescontoRepository from './CupomDescontoRepository';
import Pedido from './Pedido';

export default class CadastrarPedidoUseCase {
  constructor(private _cupomDescontoRepository: CupomDescontoRepository) {}

  execute(input: any) {
    const pedido = new Pedido(input.cpf);
    for (const item of input.itens) {
      pedido.addItem(item.produto, item.valor, item.quantidade);
    }
    if (input.cupomDesconto) {
      const cupomDesconto = this._cupomDescontoRepository.findCupomByCodigo(input.cupomDesconto);
      if (cupomDesconto && !cupomDesconto.isExpirado()) {
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    const valorTotalPedido = pedido.getValorTotal();
    return {
      valorTotalPedido
    };
  }
}
