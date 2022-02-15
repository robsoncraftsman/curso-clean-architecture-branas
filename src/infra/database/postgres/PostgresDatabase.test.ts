import PostgresDatabase from './PostgresDatabase';

describe('PostgreSQL Database', () => {
  const postgresDatabase = new PostgresDatabase();

  beforeAll(async () => {
    await postgresDatabase.connect();
  });

  test('Deve buscar vários registros no banco de dados', async () => {
    const produtos = await postgresDatabase.findAll('select * from ccca.produto', []);
    expect(produtos).toHaveLength(3);
  });

  test('Não deve encontrar registros no banco de dados', async () => {
    const produtos = await postgresDatabase.findAll('select * from ccca.produto where id = $1', ['0']);
    expect(produtos).toHaveLength(0);
  });

  test('Deve buscar apenas um registro no banco de dados', async () => {
    const produto = await postgresDatabase.findOne('select * from ccca.produto where id = $1', ['1']);
    expect(produto).toBeTruthy();
    expect(produto.id).toBe('1');
  });

  test('Não deve encontrar um registro no banco de dados', async () => {
    const produto = await postgresDatabase.findOne('select * from ccca.produto where id = $1', ['0']);
    expect(produto).toBeFalsy();
  });

  test('Deve inserir um registro no banco de dados', async () => {
    await postgresDatabase.delete('delete from ccca.cupomDesconto where codigo = $1', ['AAA']);

    await postgresDatabase.save(
      'insert into ccca.cupomDesconto (codigo, valorDesconto, dataValidade) values ($1, $2, $3)',
      ['AAA', 10, '2050-01-01T00:00:00']
    );

    const cupomDesconto = await postgresDatabase.findOne('select * from ccca.cupomDesconto where codigo = $1', ['AAA']);
    expect(cupomDesconto).toBeTruthy();
    expect(cupomDesconto.codigo).toBe('AAA');
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
