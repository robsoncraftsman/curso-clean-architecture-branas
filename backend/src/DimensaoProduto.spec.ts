import DimensaoProduto from './DimensaoProduto';

describe('Dimensão do Produto', () => {
  test('Deve calcular a dimensão do produto corretamente', () => {
    const dimensaoProduto = new DimensaoProduto(20, 15, 10);
    const volume = dimensaoProduto.volume;
    expect(volume).toBe(0.003);
  });
});
