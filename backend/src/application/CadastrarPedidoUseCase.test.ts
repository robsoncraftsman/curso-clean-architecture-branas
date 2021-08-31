import CadastrarPedidoUseCase, { CadastrarItemPedidoInput } from './CadastrarPedidoUseCase';
import CalculadoraDistanciaEntreCeps from '../domain/gateway/CalculadoraDistanciaEntreCeps';
import CupomDescontoRepository from '../domain/repository/CupomDescontoRepository';
import ProdutoRepository from '../domain/repository/ProdutoRepository';
import CupomDesconto from '../domain/entity/CupomDesconto';
import CalculadoraFreteProdutoService from '../domain/service/CalculadoraFreteProdutoService';
import CalculadoraFretePedidoService from '../domain/service/CalculadoraFretePedidoService';
import Produto from '../domain/entity/Produto';

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

const createCalculadoraFreteProdutoService = (): CalculadoraFreteProdutoService => {
  return new CalculadoraFreteProdutoService();
};

const createCalculadoraFretePedidoService = (): CalculadoraFretePedidoService => {
  return new CalculadoraFretePedidoService(
    createCalculadoraDistanciaEntreCepsStub(),
    createCalculadoraFreteProdutoService()
  );
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
    { id_produto: '1', valor: 6, quantidade: 5 },
    { id_produto: '2', valor: 35, quantidade: 2 },
    { id_produto: '3', valor: 5, quantidade: 1 }
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
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
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
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(94.5);
    expect(output.valorFrete).toBe(510);
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
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService
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
    const calcularFretePedidoService = createCalculadoraFretePedidoService();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(
      cupomDescontoValidoRepositoryStub,
      produtoRepositoryStub,
      calcularFretePedidoService
    );
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorItens).toBe(105);
    expect(output.valorItensComDesconto).toBe(105);
    expect(output.valorFrete).toBe(510);
  });
});