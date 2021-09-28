import PostgresDatabase from '../../database/postgres/PostgresDatabase';
import ProdutoRepositoryDatabase from './ProdutoRepositoryDatabase';

const postgresDatabase = new PostgresDatabase();

const createProdutoRepository = () => {
  return new ProdutoRepositoryDatabase(postgresDatabase);
};

describe('Produto Repository Database', () => {
  beforeAll(async () => {
    await postgresDatabase.connect();
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

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
