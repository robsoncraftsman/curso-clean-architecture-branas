import { CompoundAssignmentOperator } from 'typescript';
import CupomDesconto from './CupomDesconto';
import Pedido from './Pedido';

export default class CadastrarPedidoUseCase {
  private _cuponsDesconto: CupomDesconto[];

  constructor() {
    this._cuponsDesconto = [new CupomDesconto('DESC10', 10)];
  }

  execute(input: any) {
    const pedido = new Pedido(input.cpf);
    for (const item of input.itens) {
      pedido.addItem(item.produto, item.valor, item.quantidade);
    }
    if (input.cupomDesconto) {
      const cupomDesconto = this._cuponsDesconto.find((cupomDesconto) => cupomDesconto.codigo === input.cupomDesconto);
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
