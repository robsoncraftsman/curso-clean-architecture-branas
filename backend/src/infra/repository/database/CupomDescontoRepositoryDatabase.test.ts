import PostgresDatabase from '../../database/postgres/PostgresDatabase';
import CupomDescontoRepositoryDatabase from './CupomDescontoRepositoryDatabase';

const postgresDatabase = new PostgresDatabase();

const createCupomDescontoRepository = () => {
  return new CupomDescontoRepositoryDatabase(postgresDatabase);
};

describe('Cupom Desconto Repository', () => {
  beforeAll(async () => {
    await postgresDatabase.connect();
  });

  test('Deve retornar um cupom de desconto', async () => {
    const cupomDescontoRepository = createCupomDescontoRepository();
    const cupomDesconto = await cupomDescontoRepository.findByCodigo('DESC10');
    expect(cupomDesconto).toBeTruthy();
    expect(cupomDesconto!.codigo).toBe('DESC10');
  });

  test('Não deve retornar um cupom de desconto', async () => {
    const cupomDescontoRepository = createCupomDescontoRepository();
    const cupomDesconto = await cupomDescontoRepository.findByCodigo('NODESC');
    expect(cupomDesconto).toBeFalsy();
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
