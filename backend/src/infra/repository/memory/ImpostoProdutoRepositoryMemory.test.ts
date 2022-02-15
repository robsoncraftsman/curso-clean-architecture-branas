import Produto from '../../../domain/entity/Produto';
import ImpostoProdutoRepositoryMemory from './ImpostoProdutoRepositoryMemory';

describe('ImpostoProdutoRepositoryMemory', () => {
  test('Deve consultar o valor do imposto de um produto', async () => {
    const impostoProdutoRepository = new ImpostoProdutoRepositoryMemory();
    const produto = new Produto('1', 'Câmera', 1, 20, 15, 10, 1);
    const valorImposto = await impostoProdutoRepository.findValorImposto(produto);
    expect(valorImposto).toBe(20);
  });
});
