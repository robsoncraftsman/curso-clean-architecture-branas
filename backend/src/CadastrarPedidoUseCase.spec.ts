import CadastrarPedidoUseCase from './CadastrarPedidoUseCase';
import CupomDesconto from './CupomDesconto';
import CupomDescontoRepository from './CupomDescontoRepository';

const createCupomDescontoValidoRepositoryMock = (): CupomDescontoRepository => {
  class CupomDescontoRepository implements CupomDescontoRepository {
    findCupomByCodigo(codigo: string): CupomDesconto {
      const dataValidade = new Date();
      return new CupomDesconto('DESC10', 10, dataValidade);
    }
  }
  return new CupomDescontoRepository();
};

const createCupomDescontoInvalidoRepositoryMock = (): CupomDescontoRepository => {
  class CupomDescontoRepository implements CupomDescontoRepository {
    findCupomByCodigo(codigo: string): CupomDesconto {
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() - 1);
      return new CupomDesconto('DESC10', 10, dataValidade);
    }
  }
  return new CupomDescontoRepository();
};

describe('CadastrarPedidoUseCase', () => {
  test('Deve dar desconto para pedido com cupom válido', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: [
        { produto: 'Macarrão', quantidade: 6, valor: 5 },
        { produto: 'Carne', quantidade: 35, valor: 2 },
        { produto: 'Molho tomate', quantidade: 5, valor: 1 }
      ],
      cupomDesconto: 'DESC10'
    };
    const cupomDescontoValidoRepositoryMock = createCupomDescontoValidoRepositoryMock();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(cupomDescontoValidoRepositoryMock);
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorTotalPedido).toBe(94.5);
  });

  test('Não deve dar desconto para pedido com cupom inválido', () => {
    const input = {
      cpf: '864.464.227-84',
      itens: [
        { produto: 'Macarrão', quantidade: 6, valor: 5 },
        { produto: 'Carne', quantidade: 35, valor: 2 },
        { produto: 'Molho tomate', quantidade: 5, valor: 1 }
      ],
      cupomDesconto: 'DESC10'
    };
    const cupomDescontoInvalidoRepositoryMock = createCupomDescontoInvalidoRepositoryMock();
    const cadastrarPedidoUseCase = new CadastrarPedidoUseCase(cupomDescontoInvalidoRepositoryMock);
    const output = cadastrarPedidoUseCase.execute(input);
    expect(output.valorTotalPedido).toBe(105);
  });
});
