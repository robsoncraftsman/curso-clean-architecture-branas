import Pedido from '../../../domain/entity/Pedido';
import PedidoRepository from '../../../domain/repository/PedidoRepository';

export default class PedidoRepositoryMemory implements PedidoRepository {
  private _pedidos: Pedido[] = [];

  save(pedido: Pedido): Promise<void> {
    this._pedidos.push(pedido);
    return Promise.resolve();
  }

  findById(id_pedido: string): Promise<Pedido | undefined> {
    const pedidoEncontrado = this._pedidos.find((pedido) => pedido.id === id_pedido);
    return Promise.resolve(pedidoEncontrado);
  }

  delete(id_pedido: string): Promise<void> {
    this._pedidos = this._pedidos.filter((pedido) => pedido.id !== id_pedido);
    return Promise.resolve();
  }
}
