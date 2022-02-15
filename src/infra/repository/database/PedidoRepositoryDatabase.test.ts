import CupomDesconto from '../../../domain/entity/CupomDesconto';
import ItemPedido from '../../../domain/entity/ItemPedido';
import Pedido from '../../../domain/entity/Pedido';
import Produto from '../../../domain/entity/Produto';
import PostgresDatabase from '../../database/postgres/PostgresDatabase';
import PedidoRepositoryDatabase from './PedidoRepositoryDatabase';

const postgresDatabase = new PostgresDatabase();

const createPedidoRepository = () => {
  return new PedidoRepositoryDatabase(postgresDatabase);
};

describe('Pedido Repository Database', () => {
  beforeAll(async () => {
    await postgresDatabase.connect();
  });

  test('Deve retornar um pedido', async () => {
    const pedidoRepository = createPedidoRepository();
    const pedido = await pedidoRepository.findById('1');
    expect(pedido).toBeTruthy();
    expect(pedido!.id).toBe('1');
  });

  test('Não deve retornar pedido', async () => {
    const pedidoRepository = createPedidoRepository();
    const pedido = await pedidoRepository.findById('0');
    expect(pedido).toBeFalsy();
  });

  test('Deve salvar um novo pedido', async () => {
    const pedidoRepository = createPedidoRepository();
    await pedidoRepository.delete('99');
    const novoPedido = new Pedido('99', '864.464.227-84', '111.111-11');
    novoPedido.addCupomDesconto(new CupomDesconto('DESC10', 10, new Date()));
    const produto = new Produto('1', 'Câmera', 1, 20, 15, 10, 1);
    novoPedido.addItem(produto, 1, 2);
    await pedidoRepository.save(novoPedido);
    const pedidoEncontrado = await pedidoRepository.findById('99');
    expect(pedidoEncontrado).toBeTruthy();
    expect(pedidoEncontrado!.id).toBe('99');
    expect(pedidoEncontrado?.itens.length).toBe(1);
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
