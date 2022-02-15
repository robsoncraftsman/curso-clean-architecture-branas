import OperacaoEstoque from '../entity/OperacaoEstoque';
import CalculadoraEstoque from './CalculadoraEstoque';

describe('CalculadoraEstoque', () => {
  test('Deve calcular estoque corretamente', () => {
    const operacoesEstoque = [
      new OperacaoEstoque('1', 'IN', 5, new Date()),
      new OperacaoEstoque('1', 'OUT', 2, new Date()),
      new OperacaoEstoque('1', 'IN', 1, new Date())
    ];
    const calculadoraEstoque = new CalculadoraEstoque();
    const estoqueAtual = calculadoraEstoque.calcularEstoque(operacoesEstoque);
    expect(estoqueAtual).toBe(4);
  });
});
