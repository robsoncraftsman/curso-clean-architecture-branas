import Pedido from '../entity/Pedido';

export default interface PedidoRepository {
  save(pedido: Pedido): Promise<void>;
  findById(id_pedido: string): Promise<Pedido | undefined>;
  delete(id_pedido: string): Promise<void>;
}
