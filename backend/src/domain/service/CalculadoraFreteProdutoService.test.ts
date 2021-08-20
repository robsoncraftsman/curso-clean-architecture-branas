import Produto from '../entity/Produto';
import CalculadoraFreteProdutoService from './CalculadoraFreteProdutoService';

describe('Calcular Frete Produto', () => {
  const createCalculadoraFreteProdutoService = (): CalculadoraFreteProdutoService => {
    return new CalculadoraFreteProdutoService();
  };

  test('Deve calcular frete para um produto', () => {
    const produto = new Produto('1', 'Camera', 3, 20, 15, 10);
    const calculadoraFreteProdutoService = createCalculadoraFreteProdutoService();
    const valorFrete = calculadoraFreteProdutoService.calcularFreteProduto(produto, 1000);
    expect(valorFrete).toBe(30);
  });

  test('Deve estabelecer frete mínimo para um produto', () => {
    const produto = new Produto('1', 'Camera', 0.1, 20, 15, 10);
    const calculadoraFreteProdutoService = createCalculadoraFreteProdutoService();
    const valorFrete = calculadoraFreteProdutoService.calcularFreteProduto(produto, 1000);
    expect(valorFrete).toBe(10);
  });
});
