import Pedido from '../entity/Pedido';

export default interface PedidoRepository {
  save(pedido: Pedido): void;
  findById(id_pedido: string): Pedido | null;
}
