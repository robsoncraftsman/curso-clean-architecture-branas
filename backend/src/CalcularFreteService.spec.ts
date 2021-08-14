import CalcularFreteService from './CalcularFreteService';
import Produto from './Produto';

describe('Calcular Frete', () => {
  test('Deve calcular frete para um produto', () => {
    const produto = new Produto('1', 'Camera', 3, 20, 15, 10);
    const calcularFreteService = new CalcularFreteService();
    const valorFrete = calcularFreteService.calcularFreteProduto(produto, 1000);
    expect(valorFrete).toBe(30);
  });

  test('Deve estabelecer frete mínimo para um produto', () => {
    const produto = new Produto('1', 'Camera', 0.1, 20, 15, 10);
    const calcularFreteService = new CalcularFreteService();
    const valorFrete = calcularFreteService.calcularFreteProduto(produto, 1000);
    expect(valorFrete).toBe(10);
  });
});
