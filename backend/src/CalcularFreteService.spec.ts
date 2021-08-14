import CalcularFreteService from './CalcularFreteService';
import DimensaoProduto from './DimensaoProduto';
import Produto from './Produto';

describe('Calcular Frete', () => {
  test('Deve calcular frete corretamente para um produto', () => {
    const produto = new Produto('Camera', 1, new DimensaoProduto(20, 15, 10));
    const calcularFreteService = new CalcularFreteService();
    const valorFrete = calcularFreteService.calcularFreteProduto(produto, 1000);
    expect(valorFrete).toBe(10);
  });
});
