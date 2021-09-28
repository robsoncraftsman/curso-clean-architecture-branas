import Pedido from '../../../domain/entity/Pedido';
import PedidoRepository from '../../../domain/repository/PedidoRepository';
import Database from '../../database/Database';

export default class PedidoRepositoryDatabase implements PedidoRepository {
  constructor(private database: Database) {}

  async save(pedido: Pedido): Promise<void> {
    await this.database.save('insert into ccca.pedido (id, cpf, cepdestino, cupomdesconto) values ($1, $2, $3, $4)', [
      pedido.id,
      pedido.cpf,
      pedido.cepDestino,
      pedido.cupomDesconto
    ]);
  }

  async findById(id_pedido: string): Promise<Pedido | undefined> {
    const pedidoDb = await this.database.findOne('select * from ccca.pedido where id = $1', [id_pedido]);
    if (!pedidoDb) return;
    const pedido = new Pedido(pedidoDb.id, pedidoDb.cpf, pedidoDb.cepDestino);
    return pedido;
  }

  async delete(id_pedido: string): Promise<void> {
    await this.database.delete('delete from ccca.pedido where id = $1', [id_pedido]);
  }
}
