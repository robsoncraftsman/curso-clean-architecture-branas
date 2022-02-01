import CupomDesconto from '../../../domain/entity/CupomDesconto';
import ItemPedido from '../../../domain/entity/ItemPedido';
import Pedido from '../../../domain/entity/Pedido';
import Produto from '../../../domain/entity/Produto';
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
    for (let index = 0; index < pedido.itens.length; index++) {
      const itemPedido = pedido.itens[index];
      const itemPk = pedido.id + '_' + (index + 1);
      await this.database.save(
        'insert into ccca.itemPedido (id, id_pedido, id_produto, valorUnitario, quantidade) values ($1,$2,$3,$4,$5)',
        [itemPk, pedido.id, itemPedido.produto.id, itemPedido.valorUnitario, itemPedido.quantidade]
      );
    }
  }

  async findById(id_pedido: string): Promise<Pedido | undefined> {
    const pedidoDb = await this.database.findOne('select * from ccca.pedido where id = $1', [id_pedido]);
    if (!pedidoDb) return;
    const pedido = new Pedido(pedidoDb.id, pedidoDb.cpf, pedidoDb.cepdestino);
    const itensPedidoDb = await this.database.findAll('select * from ccca.itemPedido where id_pedido = $1', [
      id_pedido
    ]);
    if (itensPedidoDb) {
      for (let itemPedidoDb of itensPedidoDb) {
        const produtoDb = await this.database.findOne('select * from ccca.produto where id = $1', [
          itemPedidoDb.id_produto
        ]);
        if (produtoDb) {
          const produto = new Produto(
            produtoDb.id,
            produtoDb.nome,
            produtoDb.peso,
            produtoDb.altura,
            produtoDb.largura,
            produtoDb.profundidade,
            produtoDb.valor
          );
          pedido.addItem(produto, itemPedidoDb.valorunitario, itemPedidoDb.quantidade);
        }
      }
    }
    const cupomDesconto = pedidoDb.cupomdesconto;
    if (cupomDesconto) {
      const cupomDb = await this.database.findOne('select * from ccca.cupomDesconto where codigo = $1', [
        cupomDesconto
      ]);
      if (cupomDb) {
        const cupomDesconto = new CupomDesconto(cupomDb.codigo, parseInt(cupomDb.valordesconto), cupomDb.datavalidade);
        console.log(JSON.stringify(cupomDesconto));
        pedido.addCupomDesconto(cupomDesconto);
      }
    }
    return pedido;
  }

  async delete(id_pedido: string): Promise<void> {
    await this.database.delete('delete from ccca.itemPedido where id_pedido = $1', [id_pedido]);
    await this.database.delete('delete from ccca.pedido where id = $1', [id_pedido]);
  }
}
