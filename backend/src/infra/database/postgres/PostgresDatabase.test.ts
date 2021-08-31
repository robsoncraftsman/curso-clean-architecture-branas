import PostgresDatabase from './PostgresDatabase';

describe('PostgreSQL Database', () => {
  const postgresDatabase = new PostgresDatabase();

  beforeAll(() => {
    postgresDatabase.connect();
  });

  test('Deve buscar vários registros no banco de dados', async () => {
    const produtos = await postgresDatabase.findAll('select * from ccca.produto', []);
    expect(produtos).toHaveLength(3);
  });

  test('Não deve encontrar registros no banco de dados', async () => {
    const produtos = await postgresDatabase.findAll("select * from ccca.produto where id='0'", []);
    expect(produtos).toHaveLength(0);
  });

  test('Deve buscar apenas um registro no banco de dados', async () => {
    const produto = await postgresDatabase.findOne("select * from ccca.produto where id = '1'", []);
    expect(produto).toBeTruthy();
    expect(produto.id).toBe('1');
  });

  test('Deve buscar apenas um registro no banco de dados', async () => {
    const produto = await postgresDatabase.findOne("select * from ccca.produto where id = '0'", []);
    expect(produto).toBeFalsy();
  });

  afterAll(() => {
    postgresDatabase.disconnect();
  });
});
