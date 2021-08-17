import Produto from './Produto';

describe('Produto', () => {
  test('Deve calcular a dimensão do produto corretamente', () => {
    const produto = new Produto('1', 'Câmera', 1, 20, 15, 10);
    const volume = produto.volume;
    expect(volume).toBe(0.003);
  });

  test('Deve calcular a densidade do produto corretamente', () => {
    const produto = new Produto('1', 'Câmera', 1, 20, 15, 10);
    const densidade = produto.densidade;
    expect(densidade).toBe(333.3333333333333);
  });
});
