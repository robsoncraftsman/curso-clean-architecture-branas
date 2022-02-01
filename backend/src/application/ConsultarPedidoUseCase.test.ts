import PostgresDatabase from '../infra/database/postgres/PostgresDatabase';
import PedidoRepositoryDatabase from '../infra/repository/database/PedidoRepositoryDatabase';
import ConsultarPedidoUseCase, { ConsultarPedidoInput } from './ConsultarPedidoUseCase';

const postgresDatabase = new PostgresDatabase();

describe('ConsultarPedidoUseCase', () => {
  beforeAll(async () => {
    await postgresDatabase.connect();
  });

  test('Deve encontrar um item de pedido', async () => {
    const pedidoRepository = new PedidoRepositoryDatabase(postgresDatabase);
    const consultarPedidoUseCase = new ConsultarPedidoUseCase(pedidoRepository);
    const consultarPedidoInputput: ConsultarPedidoInput = { id: '1' };
    const consultarPedidoOutput = await consultarPedidoUseCase.execute(consultarPedidoInputput);
    expect(consultarPedidoOutput).toBeTruthy();
    expect(consultarPedidoOutput?.id).toBe('1');
    expect(consultarPedidoOutput?.itens.length).toBe(1);
    console.log(JSON.stringify(consultarPedidoOutput));
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
