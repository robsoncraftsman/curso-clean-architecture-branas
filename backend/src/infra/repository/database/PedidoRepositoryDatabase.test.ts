import CupomDesconto from '../../../domain/entity/CupomDesconto';
import Pedido from '../../../domain/entity/Pedido';
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
    const novoPedido = new Pedido('99', '86446422784', '11111111');
    novoPedido.addCupomDesconto(new CupomDesconto('DESC10', 10, new Date()));
    await pedidoRepository.save(novoPedido);
    const pedidoEncontrado = await pedidoRepository.findById('99');
    expect(pedidoEncontrado).toBeTruthy();
    expect(pedidoEncontrado!.id).toBe('99');
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
