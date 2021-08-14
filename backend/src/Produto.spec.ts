import DimensaoProduto from './DimensaoProduto';
import Produto from './Produto';

describe('Produto', () => {
  test('Deve calcular a densidade do produto corretamente', () => {
    const dimensaoProduto = new DimensaoProduto(20, 15, 10);
    const produto = new Produto('Camera', 1, dimensaoProduto);
    const densidade = produto.densidade;
    expect(densidade).toBe(333.3333333333333);
  });
});
