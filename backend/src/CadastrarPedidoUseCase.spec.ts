import CadastrarPedidoUseCase, { CadastrarItemPedidoInput } from './CadastrarPedidoUseCase';
import CalculadoraDistanciaEntreCeps from './CalculadoraDistanciaEntreCeps';
import CalcularFreteService from './CalcularFreteService';
import CupomDesconto from './CupomDesconto';
import CupomDescontoRepository from './CupomDescontoRepository';
import Produto from './Produto';
import ProdutoRepository from './ProdutoRepository';

const createCupomDescontoValidoRepositoryStub = (): CupomDescontoRepository => {
  class CupomDescontoRepositoryStub implements CupomDescontoRepository {
    findCupomByCodigo(codigo: string): CupomDesconto {
      const dataValidade = new Date();
      return new CupomDesconto('DESC10', 10, dataValidade);
    }
  }
  return new CupomDescontoRepositoryStub();
};

const createCupomDescontoInvalidoRepositoryStub = (): CupomDescontoRepository => {
  class CupomDescontoRepositoryStub implements CupomDescontoRepository {
    findCupomByCodigo(codigo: string): CupomDesconto {
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() - 1);
      return new CupomDesconto('DESC10_INVALIDO', 10, dataValidade);
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

const createProdutoRepositoryStub = (): ProdutoRepository => {
  const produtos: Produto[] = [
    new Produto('1', 'Câmera', 1, 20, 15, 10),
    new Produto('2', 'Guitarra', 3, 100, 30, 10),
    new Produto('3', 'Geladeira', 40, 200, 100, 50)
  ];

  class ProdutoRepositoryStub implements ProdutoRepository {
    findProdutoById(id: string): Produto {
      const produtoEncontrado = produtos.find((produto) => id === produto.id);
      if (produtoEncontrado != null) {
        return produtoEncontrado;
      }
      throw Error(`Produto ${id} não encontrado`);
    }
  }

  return new ProdutoRepositoryStub();
};

const createItensPedido = (): CadastrarItemPedidoInput[] => {
  return [
    { id_produto: '1', quantidade: 6, valor: 5 },
    { id_produto: '2', quantidade: 35, valor: 2 },
    { id_produto: '3', quantidade: 5, valor: 1 }
  ];
};

describe('CadastrarPedidoUseCase', () => {
  test('Deve criar pedido sem cupom de desconto', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFreteService = new CalcularFreteService();
    const calculadoraDistanciaEntreCepsStub = createCalculadoraDistanciaEntreCepsStub();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFreteService,
      calculadoraDistanciaEntreCepsStub
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
  });

  test('Deve dar desconto para pedido com cupom válido', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cupomDesconto: 'DESC10',
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFreteService = new CalcularFreteService();
    const calculadoraDistanciaEntreCepsStub = createCalculadoraDistanciaEntreCepsStub();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFreteService,
      calculadoraDistanciaEntreCepsStub
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(94.5);
  });

  test('Não deve dar desconto para pedido com cupom inválido', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cupomDesconto: 'DESC10_INVALIDO',
      cepDestino: ''
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoInvalidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFreteService = new CalcularFreteService();
    const calculadoraDistanciaEntreCepsStub = createCalculadoraDistanciaEntreCepsStub();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFreteService,
      calculadoraDistanciaEntreCepsStub
    );
    expect(() => {
      cadastrarPedidoUseCase.execute(input);
    }).toThrow(new Error('Cupom de desconto expirado: DESC10_INVALIDO'));
  });

  test('Deve criar pedido com frete', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: createItensPedido(),
      cepDestino: '22.222.222-222'
    };
    const cupomDescontoValidoRepositoryStub = createCupomDescontoValidoRepositoryStub();
    const produtoRepositoryStub = createProdutoRepositoryStub();
    const calcularFreteService = new CalcularFreteService();
    const calculadoraDistanciaEntreCepsStub = createCalculadoraDistanciaEntreCepsStub();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFreteService,
      calculadoraDistanciaEntreCepsStub
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(60 + 1050 + 2000);
  });
});
