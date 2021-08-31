import PostgresDatabase from '../../database/postgres/PostgresDatabase';
import ProdutoRepositoryDatabase from './ProdutoRepositoryDatabase';

const postgresqlDatabase = new PostgresDatabase();

const createProdutoRepository = () => {
  return new ProdutoRepositoryDatabase(postgresqlDatabase);
};

describe('Produto Repository Database', () => {
  beforeAll(() => {
    postgresqlDatabase.connect();
  });

  test('Deve retornar um produto', async () => {
    const produtoRepository = createProdutoRepository();
    const produto = await produtoRepository.findById('1');
    expect(produto).toBeTruthy();
    expect(produto!.id).toBe('1');
  });

  test('Não deve retornar produto', async () => {
    const produtoRepository = createProdutoRepository();
    const produto = await produtoRepository.findById('0');
    expect(produto).toBeFalsy();
  });

  afterAll(() => {
    postgresqlDatabase.disconnect();
  });
});
