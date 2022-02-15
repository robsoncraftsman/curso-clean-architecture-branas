import CadastrarPedidoUseCase, { CadastrarItemPedidoInput } from './CadastrarPedidoUseCase';
import CalculadoraDistanciaEntreCeps from '../domain/gateway/CalculadoraDistanciaEntreCeps';
import CupomDescontoRepository from '../domain/repository/CupomDescontoRepository';
import ProdutoRepository from '../domain/repository/ProdutoRepository';
import CupomDesconto from '../domain/entity/CupomDesconto';
import CalculadoraFreteProdutoService from '../domain/service/CalculadoraFreteProdutoService';
import CalculadoraFretePedidoService from '../domain/service/CalculadoraFretePedidoService';
import Produto from '../domain/entity/Produto';
import PedidoService from '../domain/service/PedidoService';
import PedidoRepository from '../domain/repository/PedidoRepository';
import PedidoRepositoryDatabase from '../infra/repository/database/PedidoRepositoryDatabase';
import PedidoRepositoryMemory from '../infra/repository/memory/PedidoRepositoryMemory';
import PostgresDatabase from '../infra/database/postgres/PostgresDatabase';
import ImpostoProdutoRepository from '../domain/repository/ImpostoProdutoRepository';
import ImpostoProduto from '../domain/entity/ImpostoProduto';
import ImpostoProdutoRepositoryMemory from '../infra/repository/memory/ImpostoProdutoRepositoryMemory';

const postgresDatabase = new PostgresDatabase();

const createCupomDescontoValidoRepositoryStub = (): CupomDescontoRepository => {
  class CupomDescontoRepositoryStub implements CupomDescontoRepository {
    findByCodigo(codigo: string): Promise<CupomDesconto | undefined> {
      const dataValidade = new Date();
      const cupomDescontoValido = new CupomDesconto('DESC10', 10, dataValidade);
      return Promise.resolve(cupomDescontoValido);
    }
  }
  return new CupomDescontoRepositoryStub();
};

const createCupomDescontoInvalidoRepositoryStub = (): CupomDescontoRepository => {
  class CupomDescontoRepositoryStub implements CupomDescontoRepository {
    findByCodigo(codigo: string): Promise<CupomDesconto | undefined> {
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() - 1);
      const cupomDescontoInvalido = new CupomDesconto('DESC10_INVALIDO', 10, dataValidade);
      return Promise.resolve(cupomDescontoInvalido);
    }
  }
  return new CupomDescontoRepositoryStub();
};

const createCalculadoraDistanciaEntreCepsStub = (): CalculadoraDistanciaEntreCeps => {
  class CalculadoraDistanciaEntreCepsStub implements CalculadoraDistanciaEntreCeps {
    calcularDistanciaEntreCeps(cepOrigem: string, cepDestino: string): number {
      return 1000;
    }
  }
  return new CalculadoraDistanciaEntreCepsStub();
};

const createCalculadoraFreteProdutoService = (): CalculadoraFreteProdutoService => {
  return new CalculadoraFreteProdutoService();
};

const createCalculadoraFretePedidoService = (): CalculadoraFretePedidoService => {
  return new CalculadoraFretePedidoService(
    createCalculadoraDistanciaEntreCepsStub(),
    createCalculadoraFreteProdutoService()
  );
};

const createPedidoService = (): PedidoService => {
  return new PedidoService();
};

const createProdutoRepositoryStub = (): ProdutoRepository => {
  const produtos: Produto[] = [
    new Produto('1', 'Câmera', 1, 20, 15, 10, 1),
    new Produto('2', 'Guitarra', 3, 100, 30, 10, 1),
    new Produto('3', 'Geladeira', 40, 200, 100, 50, 1)
  ];

  class ProdutoRepositoryStub implements ProdutoRepository {
    findById(id: string): Promise<Produto | undefined> {
      const produtoEncontrado = produtos.find((produto) => id === produto.id);
      if (produtoEncontrado != null) {
        return Promise.resolve(produtoEncontrado);
      }
      throw Error(`Produto ${id} não encontrado`);
    }
  }

  return new ProdutoRepositoryStub();
};

const createImpostoProdutoRepository = (): ImpostoProdutoRepository => {
  return new ImpostoProdutoRepositoryMemory();
};

const createPedidoRepository = (): PedidoRepository => {
  //return new PedidoRepositoryMemory();
  return new PedidoRepositoryDatabase(postgresDatabase);
};

const createItensPedido = (): CadastrarItemPedidoInput[] => {
  return [
    { id_produto: '1', valor: 6, quantidade: 5 },
    { id_produto: '2', valor: 35, quantidade: 2 },
    { id_produto: '3', valor: 5, quantidade: 1 }
  ];
};

describe('CadastrarPedidoUseCase', () => {
  beforeAll(async () => {
    await postgresDatabase.connect();
  });

  test('Deve criar pedido sem cupom de desconto', async () => {
    const input = {
      dataPedido: new Date(),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    const output = await cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
  });

  test('Deve dar desconto para pedido com cupom válido', async () => {
    const input = {
      dataPedido: new Date(),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cupomDesconto: 'DESC10',
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    const output = await cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(94.5);
    expect(output.valorFrete).toBe(510);
  });

  test('Não deve dar desconto para pedido com cupom inválido', async () => {
    const input = {
      dataPedido: new Date(),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cupomDesconto: 'DESC10_INVALIDO',
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoInvalidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    expect(async () => {
      await cadastrarPedidoUseCase.execute(input);
    }).rejects.toThrow(new Error('Cupom de desconto expirado: DESC10_INVALIDO'));
  });

  test('Deve criar pedido com frete', async () => {
    const input = {
      dataPedido: new Date(),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: '22.222-222'
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    const output = await cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
  });

  test('Deve criar pedido com impostos padrão', async () => {
    const input = {
      dataPedido: new Date('2000-12-01'),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    const output = await cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
    expect(output.valorImpostos).toBe(13.25);
  });

  test('Deve criar pedido com impostos especial', async () => {
    const input = {
      dataPedido: new Date('2000-01-01'),
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const pedidoService = createPedidoService();
    const pedidoRepository = createPedidoRepository();
    const impostoProdutoRepository = createImpostoProdutoRepository();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService,
      pedidoService,
      pedidoRepository,
      impostoProdutoRepository
    );
    const output = await cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
    expect(output.valorImpostos).toBe(6.625);
  });

  afterAll(async () => {
    await postgresDatabase.disconnect();
  });
});
