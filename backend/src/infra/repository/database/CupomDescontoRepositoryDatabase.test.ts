import PostgresDatabase from '../../database/postgres/PostgresDatabase';
import CupomDescontoRepositoryDatabase from './CupomDescontoRepositoryDatabase';

const postgresqlDatabase = new PostgresDatabase();

const createCupomDescontoRepository = () => {
  return new CupomDescontoRepositoryDatabase(postgresqlDatabase);
};

describe('Cupom Desconto Repository', () => {
  beforeAll(() => {
    postgresqlDatabase.connect();
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

  afterAll(() => {
    postgresqlDatabase.disconnect();
  });
});
