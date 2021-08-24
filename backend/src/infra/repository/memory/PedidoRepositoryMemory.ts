import Pedido from '../../../domain/entity/Pedido';
import PedidoRepository from '../../../domain/repository/PedidoRepository';

export default class PedidoRepositoryMemory implements PedidoRepository {
  private _pedidos: Pedido[] = [];

  save(pedido: Pedido): void {
    this._pedidos.push(pedido);
  }

  findById(id_pedido: string): Pedido | null {
    const pedidoEncontrado = this._pedidos.find((pedido) => pedido.id === id_pedido);
    return pedidoEncontrado || null;
  }
}
